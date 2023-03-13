const express = require('express')

const postRouter = express.Router()
const auth = require('../middleware/auth')
const {validatePostInputs} = require('../middleware/validation')

const  {
    create,
    getAPost,
    getPostIt,
    getPosts,
    getPostIts,
    getPostsByHandle,
    updatePost,
    deletePost,

    
    

} = postControllers = require('../controllers/posts.controller')


postRouter.post('/posts', auth, validatePostInputs, create)
postRouter.get('/posts/:id',auth, getPostIt )
postRouter.get('/posts', auth, getPostIts)
postRouter.patch('/posts/:id', auth, updatePost)
postRouter.delete('/posts/:id', auth, deletePost )
postRouter.get('/users/:userid/posts',auth, getPosts )
postRouter.get('/users/:userid/posts/:id', auth, getAPost)
postRouter.get('/users/@:handle/posts', auth, getPostsByHandle)


