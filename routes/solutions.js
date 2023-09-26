const solutionRouter = require('express').Router()
const solutionController = require('../controller/solutions')
const authenticateToken = require('../utils/authToken')

solutionRouter.post('/give-solution',  authenticateToken ,  solutionController.giveSolution)
solutionRouter.get('/all-solutions',  authenticateToken , solutionController.getAllSolutions)
solutionRouter.get('/shared-solutions/:userId', authenticateToken ,  solutionController.getUserSolutions)
solutionRouter.get('/problem-solutions/:problemId',  authenticateToken , solutionController.getSpecificProblemSolutions)
module.exports = solutionRouter
