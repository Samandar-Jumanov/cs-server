const postController = require('../superuser-controller/posts')
const postsRouter = require('express').Router()
const {authRole} = require('../utils/authRole')
const authenticateToken = require('../utils/authToken')


postsRouter.post('/create-post',  authRole , authenticateToken,   postController.createPost)

module.exports = postsRouter