const followRouter = require('express').Router();
const followController = require('../controller/follow')
const authenticateToken = require('../utils/authToken')

followRouter.post('/follow' ,  followController.Followers)
followRouter.post('/unfollow' ,  followController.unFollow)



module.exports ={
    followRouter
}