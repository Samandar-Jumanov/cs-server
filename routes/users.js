const usersRouter = require('express').Router()
const usersController = require('../controller/users')



usersRouter.post('/sign-up', usersController.Signup)
usersRouter.post('/login', usersController.Login)
usersRouter.get('/all-users', usersController.getAllUsers)
usersRouter.get('/user-info/:userId', usersController.getUserInfo)

module.exports = {usersRouter} 



