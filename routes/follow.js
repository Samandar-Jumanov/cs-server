const followRouter = require('express').Router();
const followController = require('../controller/follow')


followRouter.post('/follow', followController.Followers)
followRouter.get('/unfollowed/:useId', followController.unfollowedUsers)


module.exports ={
    followRouter
}