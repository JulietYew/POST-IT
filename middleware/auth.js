const jwt = require('jsonwebtoken')
const userService = require('../services/users.services')
const dotenv = require('dotenv')
dotenv.config();

// a middleware to autheticate users 

    const auth = async(req, res, next) => {
        try{
            // the req.header.authorization is used to return the authentication token
            // the split ('')[1] is used to extract the token from the req.headers
            const token = req.header.authorization.split('')[1]
            if(!token){
                return res.status(404).send({ message: 'You must be signed in to send postits', success: false })
            }
            const verified = jwt.verify(token, process.env.SECRET_JWT)
            if(!verified){
                return res.status(404).send({ message: 'User Verification failed', success: false })
            }
            const user = await userService.getUser({_id:verified.userId, token:'tokens.token'})
            if(!user){
                return res.status(404).send({ message: 'You are not verified', success: false })
            }
            console.log('User Authentication successful')

            req.token = token
            req.user = user
            next()
            
        }catch(error){
            res.status(404).send({message: err.message || 'Please authenticate' , success: false})
        
        }
    }
    module.exports = auth
    