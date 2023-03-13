// a collection for the comments
const Comments = require('../models/comments.model')

class CommentsService {
    // create a comment
    async createComment (newComment) {
        return await Comments.create(newComment)
    }
    // get all comments
    async getAllComments (filter) {
       return await Comments.find(filter)

    }
    // edit a comment by id
    async editCommentById (id, data) {
        return await Comments.findByIdAndUpdate({_id:id}, data);

    }
    
    // get a single comment
    async getComment (filter) {
        return await Comments.findOne(filter);
    }
    async deleteCommentById (id){
        return await User.findByIdAndDelete({_id:id}, {softDelete: true});
    }
    

}

module.exports = new CommentsService();