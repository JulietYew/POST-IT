const Joi = require('joi');

const commentsSchema = Joi.object({
  comment: Joi.string().required(),
  post_it: Joi.string().required(),
  user: Joi.string().required(),
  createdAt: Joi.boolean().required()
  
});
const postsSchema = Joi.object({
  post_it: Joi.string().required(),
  user: Joi.string().required(),
  comment: Joi.string().required(),
  createdAt: Joi.boolean().required()

})
const userSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username:Joi.string().required(),
    email_address:Joi.string().required(),
    password:Joi.string().required(),
    bio:Joi.string().optional()
    
})
const validateUserInputs = (req, res, next) => {
  try {
      const validateInput = userSchema.validate(req.body)

      if(validateInput.error) {
          return res.status(404).send({
            success: false,
            status: 'failed',
            errormessage: validateInput.error.details[0].message
        })
      } else {
        console.log("Validated successfully");
        next()
      } 
    } catch (err) {
        return res.status(400).send({
          message: err,
          status: 'failed'
        })
  }
}

// Catching required fields errors when creating a user
const validateCommentInputs = (req, res, next) => {
  try {
      const validateInput = commentsSchema.validate(req.body)

      if(validateInput.error) {
          return res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateInput.error.details[0].message
        })
      } else {
        console.log("Validated successfully");
        next()
      } 
     }catch (err) {
        return res.status(404).send({
          message: err,
          status: 'failed'
        })
  }
}

// Catching required fields errors when creating a user
const validatePostInputs = (req, res, next ) => {
  try {
      const validateInput = postsSchema.validate(req.body)

      if(validateInput.error) {
          return res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateInput.error.details[0].message
        })
      } else {
        console.log("Validated successfully");
        next()
      } 
    }catch (err) {
        return res.status(400).send({
          message: err,
          status: 'failed'
        })
  }
}

module.exports = { validateUserInputs, validateCommentInputs, validatePostInputs };
