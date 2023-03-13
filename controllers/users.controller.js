
const bcrypt = require('bcryptjs')
const userService = require('../services/users.services')
const generateToken = require('../middleware/authToken')
const  generateRandomAvatar  = require('../utils/avatar')


class UserController{
    //create a user     
        async registerUser(req, res)  {
            const {firstname , lastname , username, email_address, password } = req.body
            try{
                // check if user exist 
                const existingUser = await userService.getUser({
                    name:username
                    
                })
                if (existingUser){
                    return res.status(404).send({message: 'User already exist' || err.message, success: false})
                } 
                const { avatarUrl, altText, imageTag } = await generateRandomAvatar(email);
                const valid = await bcrypt.genSalt(10)
                const encryptedPassword = await bcrypt.hash(password, valid)
                // checks if the password is valid
                const isValidPassword = await bcrypt.compare(req.body.password, user.password);
                if (!isValidPassword) {
                  return res.status(401).send({ message: 'Invalid email or password' , success: false});
                }
                const tokenUse = {
                    id: user._id,
                    username: user.username
                }
                const token = generateToken(tokenUse)
                res.status(200).send({ token: token, success: true})

                
                
                // create a new user if the above condition was not met
                const user = await userService.create({
                    firstname: firstname,
                    lastname: lastname,
                    name:username,
                    email_address: email_address,
                    password: encryptedPassword,
                    avatarUrl: avatarUrl,
                    altText: altText,
                    imageTag: imageTag
                })
                return res.status(200).send({message: 'User registered in successfully', user, success: true })
            }catch(error){
                console.error(error)
            }
        } 
        //user login
        async loginUser(req, res) {
            const {username, password} = req.body 
            try{
                // check if the user exist
                const user = await userService.getUser({
                    name: username
                })
                if (!user){
                    return res.status(404).send({message: 'Please register your details before logging in' || err.message, success: false})
                    
                }
                const passwordMatch = await bcrypt.compare(user.password, password)
                if (!passwordMatch){
                   return res.status(404).send({message: 'Invalid password' || err.message, success: false})
                }
                const tokenUse = {
                    id: user._id,
                    username: user.username
                }
                const token = generateToken(tokenUse)
                res.status(200).send({ message: 'Token generated successfully',token: token, success: true})

            }catch(error){
                console.error(error)

            }
        }
        
        
    
        
        
    // get all users
    async getUsers(req,res){
        try{
            const users = await userService.getAllUsers({})
            if(!users){
                return res.status(404).send({message: 'Users not found' || err.message, success: false})
            }else{
                return res.status(200).send({message: 'Users found successfully', users})
            }
            
        }catch(error){
            console.error(error)
        }

    }
    // get a single user
    async getOneUser(req, res){
        const userId = req.params.id
        // check if the user exists
        try{
            const existingUser = await userService.getUser({
                _id: userId
            })
            if (!existingUser){
                return res.status(404).send({message: 'User does not exist' , success: false})

            }else{
                // returns true if the user exist
                return res.status(200).send({message: 'User fetched successfully', success: true , data:existingUser});
            }
            
        }catch(error){
            console.error(error)
        }

    }
    // Get a user by their handle
    async getUserName (req, res)  {
    const { username } = req.params;
    try {
      const user = await userService.getUser({ username });
      if (!user) {
        return res.status(404).send({message:'We do not have a user with this username', success: false});
      }else {
         return res.status(200).send({message: 'User handle available', success: true});
      }
    } catch (error) {
        console.error(error);
    }
  };
    // edit a user
    async updateUser(req, res){
        const userId = req.params.id
        const {username, password} = req.body
        // check by id if a user exists
        try{
            
            const existingUser = await userService.getUser({
                _id: userId
            })
            if (!existingUser){
                return res.status(404).send({message:'User does not exist' , success: false})

            }
            // update the user details to the current one
            const updatedUser = await userService.editUserById({
                username:username,
                password: password,
                
            })
               return res.status(200).send({message: 'User updated successfully', success: true, data:updatedUser});      
            
        }catch(error){
            console.error(error)
        }
        
    }
    // delete a user
    async  deleteOne (req,res) {
        const userId = req.params.id
        // check if a user exist before deleting
        try{
            const existingUser = await userService.getUser({
                _Id: userId
            })
            if (!existingUser){
                return res.status(404).send({message: 'Invalid User' , success: false})
    
            }
            // delete user if the above condition was met
            const deletedUser = await userService.deleteUser(userId)
            return res.status(200).send({message: 'Soft delete was done', success: true, data:deletedUser})
        }catch(error){
            console.error(error)
        }
    }

}
module.exports= new UserController()
