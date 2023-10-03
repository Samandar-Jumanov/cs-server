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
const {DbUsers, Messages, SharedCode} = require('./models/relations')
const cookieParser  = require('cookie-parser')
const hackatonRouter = require('./mentor_routes/hackaton')
const stripe = require('stripe')(process.env.STRIPESECRETKEY)

const io =  new Server(server ,
  cors({
  origin: '*', 
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
app.use('/api/v1/admin/hackaton', hackatonRouter)



//Messages 
app.post('/api/v1/send-message', async  (request , response , next ) =>{

  const {userId , recieverUserId  , postId } = request.body 

  let t ;
       try {
         t = await sequelize.transaction();
         
        const post = await SharedCode.findByPk(postId)
        const senderUser = await DbUsers.findByPk(userId)
        const recieverUser = await DbUsers.findByPk(recieverUserId)
        
        if(!senderUser || !recieverUser){
          return response.json({
            message :'User not found '
          })
        }

        try{
           await  io.to(recieverUserId).emit('send_message', post)
           console.log(post);
        }catch(err){
         console.log(err)
        }
   
        
        const newMessage = await Messages.create({
          message : post ,
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


app.post('/payment', async (request , response , next ) =>{
  const {userId , source} = request.body 
  try {

    const user = await DbUsers.findByPk(userId)
    if(!user){
      return response.json({
        message :'User not found'
      })
    }

    const charge = await stripe.charges.create({
      amount : 5 , 
      currency,
      source,
    });
     
    response.json({
      message :'Payment was succesfully '
    })
  } catch (error) {
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


