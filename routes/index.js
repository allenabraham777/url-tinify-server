const Joi = require('@hapi/joi')
const Url = require('../models/url')

module.exports.register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      tags: ['api', 'index'],
      description: 'Redirect to Home Page',
    },
    handler: async (request, h) => {
      return h.redirect('https://client.cutcut.cf')
    }
  })

  server.route({
    method: 'GET',
    path: '/{shortUrl}',
    config: {
      tags: ['api', 'index'],
      description: 'Redirect to the original website',
      validate: {
        params: Joi.object({
            shortUrl : Joi.string()
        })
      }
    },
    handler: async (request, h) => {
      const {shortUrl} = request.params
      const response = await Url.findOne({shortUrl}).select('longUrl -_id')
      if(response) {
        return h.redirect(response.longUrl)
      }
      else {
        return h.response({error: "Not Found"}).code(404)
      }
    }
  })
}
module.exports.pkg = {
  name: 'index'
}