const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config();

// Generate JWT token
const jwtKey = process.env.SECRET_JWT
const duration = process.env.JWT_EXPIRES_IN

function generateToken(user){
    const token = jwt.sign({userId: user._id}, jwtKey, {expiresIn: duration})
    return token

}

// verify the token


module.exports = generateToken;