// a collection for the users
const User = require('../models/users.model');

class UsersService {
    // create a user
    async create (newUser){
        return await User.create(newUser)
    }
    // get all users
    async getAllUsers (filter){
       return await User.find(filter, {softDelete: false})

    }
    // edit a user by id
    async editUserById (id, data){
        return await User.findByIdAndUpdate({_id:id}, data);

    }
    // delete a user by id
    async deleteUserById (id){
        return await User.findByIdAndDelete({_id:id}, {softDelete: true});
    }
    // get a single user
    async getUser (filter) {
        return await User.findOne(filter);
    }

}

module.exports = new UsersService();