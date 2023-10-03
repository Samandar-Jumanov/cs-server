const postController = require('../mentor_controller/posts')
const { upload } = require('../routes/multer')
const postsRouter = require('express').Router()

postsRouter.post('/create-post', upload.single('video'), postController.createPost)

module.exports = postsRouter