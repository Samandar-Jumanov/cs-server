const solutionRouter = require('express').Router()
const solutionController = require('../controller/solutions')


solutionRouter.post('/give-solution', solutionController.giveSolution)
solutionRouter.get('/all-solutions', solutionController.getAllSolutions)
solutionRouter.get('/shared-solutions/:userId', solutionController.getUserSolutions)


module.exports = solutionRouter