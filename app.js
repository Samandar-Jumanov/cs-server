const express = require('express')
const {usersRouter} = require('./routes/users')
const cors = require('cors')
const sequelize = require('./utils/db')
const problemsRouter = require('./routes/shareProblems')
const solutionRouter = require('./routes/solutions')
const { followRouter } = require('./routes/follow')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)
const {DbUsers, Messages} = require('./models/relations')
const cookieParser  = require('cookie-parser')

const io =  new Server(server ,
  cors({
  origin: 'http://localhost:3000/message', 
  methods: ['GET', 'POST' , 'PUT', 'DELETE']  , 
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only specified headers
  }))

// Enable CORS with specific options
app.use(cors());
    
    app.get('/', (req, res , next )=>{
      res.send('Started')
    })
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/problems', problemsRouter)
app.use('/api/v1/solutions', solutionRouter)
app.use('/api/v1/follows', followRouter)


//Messages 


app.post('/api/v1/send-message', async  (request , response , next ) =>{

  const {userId , recieverUserId , message } = request.body 

  let t ;
       try {
        t = await sequelize.transaction();

        const senderUser = await DbUsers.findByPk(userId)
        const recieverUser = await DbUsers.findByPk(recieverUserId)
        
        if(!senderUser || !recieverUser){
          return response.json({
            message :'User not found '
          })
        }

        try{
           await  io.to(recieverUserId).emit('send_message', message)
           console.log(message)
        }catch(err){
         console.log(err)
        }
   
        
        const newMessage = await Messages.create({
          message : message ,
          userId : userId ,
          recieverUserId : recieverUserId ,
          from : senderUser.username 
        })

        await senderUser.addMessages(newMessage,{ transaction : t })
        await recieverUser.addMessages(newMessage , {transaction : t })
        await t.commit()

        response.json({
          message :'Sent succesfully'
        })
       } catch (error) {
        await t.rollback()
        console.log(error)
        next(error)
       }
})

sequelize.sync().then(()=>{
  console.log('Database  working ')
}).catch((error)=>{
  console.log(error)
})

server.listen(3001 ,()=>{
  console.log('Server started ')
})


