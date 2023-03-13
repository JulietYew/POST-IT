// connecting to MongoDB
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

function database (){
    return mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    
}
module.exports = database;