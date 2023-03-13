const {Router} = require('express')
const {validateCommentInputs} =require('../middleware/validation')
const commentRouter =Router()

const  {
    create,
    getAll,
    getOne,
    updateComment,
    deleteComment,
    getUserComments,
    getUserComment
    

} = commentControllers = require('../controllers/comments.controller')

const auth = require('../middleware/auth')

commentRouter.post('/posts/:postId/comments', auth, validateCommentInputs, create)
commentRouter.get('/posts/:postId/comments', auth, getAll)
commentRouter.get('/posts/:postId/comments/:id', auth, getOne)
commentRouter.patch('/posts/:postId/comments/:id', auth, updateComment)
commentRouter.delete('/posts/:postId/comments/:id', auth, deleteComment)
commentRouter.get('/users/:userId/posts/:postId/comments', auth, getUserComments)
commentRouter.get('/users/:userId/posts/:postId/comments/:id', auth, getUserComment)

module.exports = commentRouter