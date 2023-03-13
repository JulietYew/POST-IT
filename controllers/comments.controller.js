const commentService = require('../services/comments.services')
const postService = require('../services/posts.services')
const userService = require('../services/users.services') 

class CommentController{
    // create a comment
    async create(req, res){
        // find the post with the postId to which comment want to be made
        const comment = req.body
        //we are using req.params.postId to specify the particular post for more clarity
        const postId = req.params.postId
        try {
            const post = await postService.getPost(postId);
            if (!post) {
              return res.status(404).send({ message: 'Post not found' || err.message, success:false });
            }
            const newComment = await commentService.createComment({ 
              comment: comment,
              postId: postId
           });
            return res.status(200).send({message: 'Comment created successfully', newComment, success: true })   
        }catch(error){
              console.error(error)
        }
    }
    // get all comments
    async getAll(req,res){
        const postId = req.params.postId;
        try {
            const post = await postService.getPost(postId);
            if (!post) {
                return res.status(404).send({ message: 'Post not found'|| err.message, success: false });
            }

            const comments = await commentService.getAllComments({ postId });
            return res.status(200).send({message: 'Comments found successfully', comments, success: true });
        }catch (error) {
            console.error(error)
        }
   }
    //get a single comment
    async getOne(req, res){
        const postId = req.params.postId
        const commentId = req.params.commentId
        try{
          const comment = await commentService.getComment({
             _id: commentId, 
             postId:postId 
            });
          if (!comment) {
            return res.status(404).send({ message: 'Comment not found' || err.message, success: false});
          }else{
            return res.status(200).send({message: 'Comment found successfully', success: true });
          }
          
        }catch(error){
            console.error(error)
        }
    }
    // edit a comment
    async updateComment(req, res){
        const comment = req.body
        const postId = req.params.postId;
        const commentId = req.params.commentId; 
        try{
          const com = await commentService.getComment({
            _id: commentId,
            postId: postId
          })
          if (!com){
            return res.status(404).send({ message: 'Comment not found' || err.message, success: false});
          }
          const updatedComment = await commentService.editCommentById({
            comment: comment
        })
        return res.status(200).send({message: 'Comment updated successfully', success: true, data:updatedComment});      

        }catch(error){
            console.error(error)
        }

    }
    // delete a comment
    async deleteComment  (req, res)  {
      try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
    
        // Find the comment by ID
        const comment = await commentService.getComment(commentId);
    
        
        // Check if the user is the author of the comment
        if (comment.user.toString() !== userId.toString()) {
          return res.status(404).json({ message: 'You are not authorized to delete this comment' });
        }
        const deletedComment = await commentService.deletecommentById(commentId)
        console.log('Comment successfully deleted')
        //return res.status(200).send({message: 'Soft delete was done', success: true, data:deletedComment})
    
      } catch (err) {
        console.error(err);
      }
    };
    


// Get all comments for a post for a user
    async getUserComments(req, res)  {
     const { userId, postId } = req.params;
     try {
        const comments = await commentService.getComment({ 
        user_id: userId,
        post_id: postId });
        res.status(200).send({message:'Comments found successfully', comments});
  } catch (error) {
      console.error(error)
  }
}

// Get a single comment for a post for a user
    async getUserComment(req, res)  {
      const { userId, postId, commentId } = req.params;
      try {
         const comment = await commentService.getComment({
          _id: commentId, 
          user_id: userId,
          post_id: postId
         });
          if (!comment) {
           return res.status(404).send();
          }else {
            res.send(comment);
          }
        } catch (err) {
            res.status(500).send(err);
        }
}
}
 module.exports = new CommentController()
