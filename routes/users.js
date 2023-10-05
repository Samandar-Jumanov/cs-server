const usersRouter = require('express').Router()
const usersController = require('../controller/users')
const authenticateToken = require('../utils/authToken')

usersRouter.post('/sign-up', usersController.Signup)
usersRouter.post('/login', usersController.Login)
usersRouter.get('/all-users', usersController.getAllUsers)
usersRouter.get('/user-info/:userId',  authenticateToken,  usersController.getUserInfo)
usersRouter.get('/change-role', authenticateToken,   usersController.changeRole)

module.exports = {usersRouter} 



