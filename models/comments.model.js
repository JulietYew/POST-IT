const mongoose = require('mongoose')
const  User= require('./users.model')
const Posts = require('./posts.model')

// Schema here defines the structure of the document


const commentsSchema = new mongoose.Schema({
    // A single post on the POST IT app
  comment: { 
    type: String,
    required: true 
},
  
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true, 
},
  posts:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Posts,
    required: true,
},
   createdAt:{
    type: Date,
    default:Date.now,

},
   updatedAt:{
    type: Date,
    default: Date.now,

},
    softDelete:{
      type: Boolean,
      default: false

}
}, {timestamps: true});

const Comments = mongoose.model('comments', commentsSchema);
module.exports = Comments;

