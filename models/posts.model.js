const mongoose = require('mongoose')
const  User= require('./users.model')
const Comments = require('./comments.model')

// Schema here defines the structure of the document


const postsSchema = new mongoose.Schema({
    // A single post on the POST IT app
  post_it: { 
    type: String,
    required: true 
},
  
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
},
  comments:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
},
   createdAt:{
    type: Date,
    default:Date.now,

},
   updatedAt:{
    type: Date,
    default: Date.now,

},
// implementing soft delete
softDelete: {
  type: Boolean,
  default: false
}
 
}, {timestamps: true});

const Posts= mongoose.model('posts', postsSchema);
module.exports = Posts;

