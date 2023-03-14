const jwt = require('jsonwebtoken')
const userModel = require('../models/users.model')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// a middleware to autheticate users 

    const auth = async(req, res, next) => {
        try{
            console.log('first one')
            let token = ''
        //Gets token from client header (like a cookie stored or attached to a user's unique id from the client side after they sign up or sign in)
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            } else {
            // This is an alternate method of getting it from previously set cookies for the purpose of testing
            token = req.cookies.token
        }
            if(!token){
                return res.status(404).send({ message: 'You must be signed in to send postits', success: false })
            }
            console.log('second one')
            const verified = jwt.verify(token, process.env.SECRET_JWT)
            if(!verified){
                return res.status(404).send({ message: 'User Verification failed', success: false })
            }
            const user = await userModel.findOne({_id:verified._id, token:'tokens.token'})
            if(!user){
                return res.status(404).send({ message: 'You are not verified', success: false })
            }
            console.log('User Authentication successful')

            req.token = token
            req.user = user
            next()
            
        }catch(error){
            return res.status(404).send({message: 'Please authenticate' , success: false})
        
        }
    }
    module.exports = auth
    