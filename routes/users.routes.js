const {Router} = require('express')

const userRouter = Router()
const auth = require('../middleware/auth')
const {validateUserInputs} = require('../middleware/validation')

const  {
    registerUser,
    loginUser,
    getOneUser,
    getUsers,
    updateUser,
    deleteOne,
    getUserName

} = userControllers = require('../controllers/users.controller')

userRouter.post('/users/register', validateUserInputs, registerUser)
userRouter.post('/users/login',auth, validateUserInputs ,loginUser)
userRouter.get('/users', auth, getUsers)
userRouter.get('/users/:id', getOneUser)
userRouter.patch('/users/:id', auth, updateUser)
userRouter.delete('/users/:id', auth, deleteOne)
userRouter.get('/users/@:handle', auth, getUserName)


module.exports = userRouter