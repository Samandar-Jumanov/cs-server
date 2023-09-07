const problemRouter = require('express').Router()
const problemController =require('../controller/shareProblems')

problemRouter.get('/shared-all/:userId', problemController.getUserSharedProblems)
problemRouter.post('/share-problem', problemController.shareProblem)

module.exports ={
    problemRouter
}