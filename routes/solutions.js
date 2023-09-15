const solutionRouter = require('express').Router()
const solutionController = require('../controller/solutions')
const {Solutions} = require('../models/models')
solutionRouter.post('/give-solution', solutionController.giveSolution)
solutionRouter.get('/all-solutions', solutionController.getAllSolutions)

solutionRouter.put('/clear', async (request , response,next ) =>{
    await Solutions.update(
        { where: {} } 
      );
})
module.exports = solutionRouter