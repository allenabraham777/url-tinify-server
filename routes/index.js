const Joi = require('@hapi/joi')
const Url = require('../models/url')

module.exports.register = (server, options) => {
  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        auth: false,
        tags: ['api', 'index'],
        description: 'Redirect to Home Page',
      },
      handler: async (request, h) => {
        return h.redirect('https://client.cutcut.cf')
      }
    },
    {
      method: 'GET',
      path: '/{shortUrl}',
      config: {
        auth: false,
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
        const response = await Url.findOne({shortUrl})
        response.clicks++
        response.save()
        if(response) {
          return h.redirect(response.longUrl)
        }
        else {
          return h.response({message: "Not Found"}).code(404)
        }
      }
    }
  ])
}
module.exports.pkg = {
  name: 'index'
}