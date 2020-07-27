const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')

const {createToken} = require('../../utils/createToken')

const User = require('../../models/user')

module.exports.register = (server, options) => {
  server.route([{
    method: 'POST',
    path: '/signup',
    config: {
      auth: false,
      tags: ['api', 'auth'],
      description: 'Create a user',
      validate: {
        payload: Joi.object({
          name: Joi.string().min(6).required(),
          email: Joi.string().min(6).pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)).required(),
          password: Joi.string().min(8).required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).error(new Error('Password should contain numbers, special characters, lowercase and uppercase letters')),
          password_confirmation: Joi.string().valid(Joi.ref('password')).required().error(new Error('Password missmatch'))
        }),
        failAction: (request, h, error) => {
          throw error
        }
      }
    },
    handler: async (request, h) => {
      const {name, email, password} = request.payload
      const userExist = await User.findOne({email})
      if(userExist) {
        return h.response({message: 'User Exist'}).code(409)
      }

      try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({name, email, password: hashedPassword})
        const savedUser = user.save()
        if(savedUser)
          return h.response({message: "User Created Successfully"}).code(202)
        return h.response({message: "Internal Server Error"}).code(500)
        
      }catch(err){
        return h.response({message: "Internal Server Error"}).code(500)
      }



    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      tags: ['api', 'auth'],
      description: 'Login to the system',
      validate: {
        payload: Joi.object({
          email: Joi.string().min(6).pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)).required(),
          password: Joi.string().min(8).required()
        }),
        failAction: (request, h, error) => {
          throw error
        }
      }
    },
    handler: async (request, h) => {
      const {email, password} = request.payload
      
      const user = await User.findOne({email})

      if(user) {
        const validPass = await bcrypt.compare(password, user.password)
        if(validPass) {
          const token = createToken(user)
          return h.response({token}).code(201)
        }
        else {
          return h.response({message: 'Check email or password'}).code(401)
        }
      }
      return h.response({message: 'Check email or password'}).code(401)
      // return h.response(request.payload)
    }
  }])
}

module.exports.pkg = {
  name: "Authentication"
}