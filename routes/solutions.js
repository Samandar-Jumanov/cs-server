const solutionRouter = require('express').Router()
const solutionController = require('../controller/solutions')

solutionRouter.post('/give-solution', solutionController.giveSolution)

module.exports = solutionRouter