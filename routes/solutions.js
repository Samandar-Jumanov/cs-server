const solutionRouter = require('express').Router()
const solutionController = require('../controller/solutions')

solutionRouter.post('/give-solution', solutionController.giveSolution)
solutionRouter.get('/all-solutions', solutionController.getAllSolutions)

module.exports = solutionRouter