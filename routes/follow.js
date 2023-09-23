const followRouter = require('express').Router();
const followController = require('../controller/follow')


followRouter.post('/follow', followController.Followers)



module.exports ={
    followRouter
}