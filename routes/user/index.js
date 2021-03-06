const Joi = require('@hapi/joi')
const Url = require('../../models/url')
const UserUrl = require('../../models/userUrl')

module.exports.register = (server, options) => {
  server.route([
    {
      method: 'POST',
      path: '/generate',
      config: {
        auth: 'jwt',
        tags: ['api', 'user'],
        description: 'Generate tinified url - Available only to logged in user',
        validate: {
          payload: Joi.object({
            longUrl: Joi.string().pattern(new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)).required()
          })
        }
      },
      handler: async (request, h) => {
        const {id} = request.auth.credentials
        const {longUrl} = request.payload
        
        if(longUrl.includes(process.env.HOST)) {
          return h.response({message: "Please enter a valid Url"}).code(422)  
        }
        
        const url = new Url({
          longUrl
        })
        
        try {
          const {_id, shortUrl, longUrl, clicks} = await url.save()
          const userUrl = new UserUrl({
            user: id,
            url: _id
          })
          await userUrl.save()
          return h.response({shortUrl: `${process.env.HOST}/${shortUrl}`,_id, longUrl, clicks}).code(200)  
        }
        catch(error) {
          return h.response({message: "Internal Server Error"}).code(500)  
        }
      }
    },
    {
      method: 'GET',
      path: '/all',
      config: {
        auth: 'jwt',
        tags: ['api', 'user'],
        description: 'Get list of all tinified url created by the logged in user',
      },
      handler: async (request, h) => {
        const {id} = request.auth.credentials
        try{
          let urls = await UserUrl.find({user: id}).select('url -_id')
          urls = await urls.map((url) => {
            return url.url
          })
  
          let find = await Url.find({_id: urls}).select('longUrl shortUrl clicks')
          find = find.map((url) => {
            return {
              _id: url._id,
              url: url.longUrl,
              shortUrl: `${process.env.HOST}/${url.shortUrl}`,
              clicks: url.clicks
            }
          })

          return find
        }
        catch (err) {
          throw err
        }
        
      }
    }
  ])
} 
module.exports.pkg = {
  name: 'userUrl'
}