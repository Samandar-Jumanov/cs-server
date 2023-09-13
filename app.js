const express = require('express')
const {usersRouter} = require('./routes/users')
const { problemRouter } = require('./routes/problems')
// const solutionRouter = require('./routes/solutions')
const cors = require('cors')
const sequelize = require('./utils/db')
const app = express()


app.use(express.json())

// Enable CORS with specific options
app.use(
    cors({
      origin: '*', 
      methods: ['GET', 'POST' , 'PUT', 'DELETE']  , 
      allowedHeaders: ['Content-Type', 'Authorization'] // Allow only specified headers
    })
  );

app.get('/', (req, res , next )=>{
    res.send('Started')
})

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/problems', problemRouter)
// app.use('/api/v1/solutions', solutionRouter)


sequelize.sync().then(()=>{
  console.log('Database  working ')
}).catch((error)=>{
  console.log(error)
})


app.listen(3001 ,()=>{
  console.log('Server started ')
})
