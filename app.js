const express = require('express')
const {usersRouter} = require('./routes/users')
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


sequelize.sync().then(()=>{
  console.log('Database  working ')
}).catch((error)=>{
  console.log(error)
})


app.listen(3001 ,()=>{
  console.log('Server started ')
})
