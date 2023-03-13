// A model that describes the structure of the User database
const mongoose = require('mongoose')
const Post = require('./posts.model')

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        lowercase: true , 
        min: 10,
        max: 50,
  },
    lastname:{
        type: String,
        required: true,
        lowercase: true ,
        min: 10,
        max: 50, 
    },
    username:{
        type:String,
        required: true,
        lowercase: true , 
        unique:true,
        min: 7,
        max: 25,

    },
    email_address:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 50,
        unique : true,

    },
    password:{
        type: String,
        required: true,
        lowercase: true,
    },
    bio:{
        type: String,

    },
    avatarUrl:{
        type: String,
        required: true
    },

    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,

    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }],
      // implementing soft delete
      softDelete: {
        type: Boolean,
        default: false
      }
   
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;

