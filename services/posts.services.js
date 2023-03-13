const Posts = require('../models/posts.model');

class PostsService {
    // create a post
    async createPost (newPost){
        return await Posts.create(newPost)
    }
    // get all posts
    async getAllPosts (filter){
       return await Posts.find(filter)

    }
    // edit a post by id
    async editPostById (id, data){
        return await User.findByIdAndUpdate({_id:id}, data);

    }
    // delete a post by id
    async deletePostById (id){
        return await User.findByIdAndDelete({_id:id}, {softDelete: true});
    }
    // get a single post
    async getPost (filter) {
        return await User.findOne(filter);
    }

}

module.exports = new PostsService();