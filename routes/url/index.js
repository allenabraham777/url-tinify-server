const Joi = require('@hapi/joi')
const Url = require('../../models/url')
require('dotenv').config()


module.exports.register = (server, options) => {
  server.route({
    method: 'POST',
    path: '/generate',
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          longUrl: Joi.string().pattern(new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)).required()
        })
      }
    },
    handler: async (request, h) => {
      const {longUrl} = request.payload
      console.log(longUrl);
      const response = await Url.findOne({longUrl}).select('shortUrl -_id')
      if(response) {
        return h.response({shortUrl: `${process.env.HOST}${process.env.shortUrl}`}).code(200)
      }

      const url = new Url({
        longUrl
      })

      try {
        const {shortUrl} = await url.save()
        return h.response({shortUrl: `${process.env.HOST}${shortUrl}`}).code(200)  
      }
      catch(error) {
        return h.response({error: "Internal Server Error"}).code(500)  
      }
    }
  })
}
module.exports.pkg = {
  name: "url"
}