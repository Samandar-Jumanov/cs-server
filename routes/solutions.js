const solutionRouter = require('express').Router()
const solutionController = require('../controller/solutions')


solutionRouter.post('/give-solution', solutionController.giveSolution)
solutionRouter.get('/all-solutions', solutionController.getAllSolutions)
solutionRouter.get('/shared-solutions/:userId', solutionController.getUserSolutions)
solutionRouter.get('/problem-solutions/:problemId', solutionController.getSpecificProblemSolutions)


module.exports = solutionRouter