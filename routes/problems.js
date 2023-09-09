const problemRouter = require('express').Router()
const problemController =require('../controller/shareProblems')

problemRouter.get('/shared-all/:userId', problemController.getUserSharedProblems)
problemRouter.post('/share-problem', problemController.shareProblem)
problemRouter.get('/all-problem', problemController.getAllProblems)

module.exports ={
    problemRouter
}