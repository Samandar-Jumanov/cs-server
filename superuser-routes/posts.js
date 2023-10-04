const postController = require('../superuser-controller/posts')
const { upload } = require('../routes/multer')
const postsRouter = require('express').Router()
const {authRole} = require('../utils/authRole')


postsRouter.post('/create-post', upload.single('video'), authRole ,  postController.createPost)

module.exports = postsRouter