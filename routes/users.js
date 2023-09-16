const usersRouter = require('express').Router()
const usersController = require('../controller/users')



usersRouter.post('/sign-up', usersController.Signup)
usersRouter.post('/login', usersController.Login)
// usersRouter.get('/all-shared/:userId', usersController.getUserAllProblems)



module.exports = {usersRouter} 



