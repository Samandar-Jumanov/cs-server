const problemsRouter = require('express').Router()
const shareProblemsController = require('../controller/shareProblems')

problemsRouter.post('/create', shareProblemsController.shareProblem)
problemsRouter.get('/all', shareProblemsController.getAllProblems)
problemsRouter.get('/created-problems/:userId', shareProblemsController.getUserCreatedProblems)

module.exports = problemsRouter
