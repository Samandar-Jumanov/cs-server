const followRouter = require('express').Router();
const followController = require('../controller/follow')
const authenticateToken = require('../utils/authToken')

followRouter.post('/follow', authenticateToken ,  followController.Followers)



module.exports ={
    followRouter
}