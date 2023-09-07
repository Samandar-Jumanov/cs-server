const express = require('express')
const sequelize = require('./utils/db')
const {usersRouter} = require('./routes/users')
const { problemRouter } = require('./routes/problems')
const app = express()


app.use(express.json())

app.get('/', (req, res , next )=>{
    res.send('Started')
})

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/problems', problemRouter)
 

sequelize.sync().then(()=>{
    console.log('Connected....')
}).catch(err =>{
    console.log(err)
})

app.listen(3001 , ()=>{
    console.log('Server started')
})

