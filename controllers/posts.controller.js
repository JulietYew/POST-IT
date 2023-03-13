const postService = require('../services/posts.services')
const userService = require('../services/users.services')

class PostController{
    //create a post
    async create (req, res){
        // attaching the post to a particular user Id and then creating the post
        const post_it  = req.body
        const userId = req.params.id
        try{
            const user = await userService.getUser({
                _id:userId
             });
             if(user){
                return res.status(200).send({message: 'You can create a postit' || err.message, success: true})
             }


            const post = await postService.createPost({ 
                post_it: post_it,
                user: user._id
             });
            return res.status(200).send({message: 'Post created successfully', post, success: true })
        
        }catch(error){
            console.error(error)
        }
    }  
    
    // get all posts
    async getPosts(req, res){
        // getting all the posts associated to a particular userId
        const userId = req.params.userId;
        try{
            // getting all posts from newest first to the previous post using sort
            const posts = await postService.getAllPosts({userId}).sort({ createdAt: -1 })
            if(!posts){
                return res.status(404).send({message: 'Posts not found' || err.message, success: false})
            }else{
                return res.status(200).send({message: 'Posts found successfully', posts, success: true})
            }
            
        }catch(error){
            console.error(error)
        }

    }
    
    // get a single post for a user
    async getAPost(req, res){
        const {userId, postId} = req.params;
        try{
            const post = await postService.getPost({ 
                _id: postId, 
                userId: userId 
            });
            if (!post) {
                 return res.status(404).send({ message: 'Post not found' || err.message, success: false });
            }else{
                // returns true if a particular post for a user exist.
                return res.status(200).send({message: 'post fetched successfully', success: true });
            }


        }catch(error){
            console.error(error)
        } 
    }
    
   
    async getPostsByHandle(req, res){
        // Get all posts for a user by their handle
        const { username} = req.params;
        try {
      // First, find the user by their handle
            const user = await userService.getUser(username);
            if (!user) {
                return res.status(404).send({message:'User not found', success:false}); 
            }
      // Then, find all posts by the user
            const posts = await postService.getAllPosts({ user_id: user._id });
            return res.status(200).send({message: "User's Posts found", success: true,posts});
        } catch (error) {
            console.error(error)
    }
  }
    async getPostIts(req, res){
        
            try {
              const posts = await postService.getAllPost({});
              return resstatus(200).send({mesage:'All posts found',success: true,posts});
            } catch (err) {
              res.status(500).send(err);
            }
          ;

    }

    async getPostIt(req, res){
        const postId = req.params
        try{
            const existingPost = await postService.getPost({ 
                _id: postId,
                 
            })
            if(!existingPost){
                return res.status(404).send({message: "Post does not exist", success: false})
            }else{
                // returns true if a particular post  exist.
                return res.status(200).send({message: 'Post fetched successfully', success: true });
            }
        }catch(error){
            console.error(error)
        }
        
    }
    // edit a post
    async updatePost(req, res){
        const {postId, userId }= req.params.id
        const {post_it} = req.body
        try{
            const post = await postService.getPost({ 
                _id: postId,
                userId: userId 
            });
             if (!post) {
                 return res.status(404).json({ message: 'Post not found' || err.message, success: false });
            }
            // update the post details to the current one
            const updatedPost = await postService.editPostById({
                post_it: post_it
            })
            return res.status(200).send({message: 'Post updated successfully', success: true, data:updatedPost});      
        }catch(error){
            console.error(error)
        }

    }
    
    
    // delete a post
    async deletePost(req, res){
        const {postId, userId} = req.params.id
        // check if a post for a particular userId exist before deleting
        try{
            const existingPost = await postService.getPost({
                _id: postId,
                
            })
            if (!existingPost){
                return res.status(404).send({message: 'No post found' , success: false})
    
            }
            if (existingPost.user.toString() !== userId){
                return res.status(400).send({message: 'You are not authorized to delete this post' , success: false})
    
            }
            // delete post if the above condition was met
            const deletedPost = await postService.deletePostById(postId)
            return res.status(200).send({message: 'Soft delete was done', success: true, data:deletedPost})
        

        }catch(error){
            console.error(error)
        }

    }
}
    
module.exports = new PostController()