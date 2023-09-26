const problemsRouter = require('express').Router()
const shareProblemsController = require('../controller/shareProblems')
const authenticateToken = require('../utils/authToken')

problemsRouter.post('/create', authenticateToken ,  shareProblemsController.shareProblem)
problemsRouter.get('/all', authenticateToken ,  shareProblemsController.getAllProblems)
problemsRouter.get('/created-problems/:userId', authenticateToken ,   shareProblemsController.getUserCreatedProblems)

module.exports = problemsRouter
