const problemsRouter = require('express').Router()
const shareProblemsController = require('../controller/shareProblems')

problemsRouter.post('/create', shareProblemsController.shareProblem)

module.exports = problemsRouter
