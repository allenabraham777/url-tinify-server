const Joi = require('@hapi/joi')
const Url = require('../../models/url')
require('dotenv').config()


module.exports.register = (server, options) => {
  server.route({
    method: 'POST',
    path: '/generate',
    config: {
      auth: false,
      tags: ['api', 'public'],
      description: 'Generate tinified url - Available only to non logged in used',
      validate: {
        payload: Joi.object({
          longUrl: Joi.string().pattern(new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)).required()
        })
      }
    },
    handler: async (request, h) => {
      const {longUrl} = request.payload

      const url = new Url({
        longUrl
      })

      try {
        const {shortUrl} = await url.save()
        return h.response({shortUrl: `${process.env.HOST}/${shortUrl}`}).code(200)  
      }
      catch(error) {
        return h.response({message: "Internal Server Error"}).code(500)  
      }
    }
  })
}
module.exports.pkg = {
  name: "url"
}