const problemsRouter = require('express').Router()
const shareProblemsController = require('../controller/shareProblems')

problemsRouter.post('/create', shareProblemsController.shareProblem)
problemsRouter.get('/all', shareProblemsController.getAllProblems)


module.exports = problemsRouter
