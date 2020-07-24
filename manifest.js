const Path = require('path')
require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT,
    routes: {
      cors: true,
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: require('hapi-swagger'),
        options: {
          'grouping': 'tags',
          'host': 'localhost:3001',
          'info': {
            'title': 'API Documentation',
            'version': '1.0.0',
            'contact': {
              'name': 'Allen K Abraham',
              'email': 'allenabraham777@gmail.com'
            },
          },
          'schemes': ['http']
        }
      },
      {
        plugin: require('@hapi/vision'),
      },
      {
        plugin: require('@hapi/inert'),
      },
      {
        plugin: require('./routes'),
      },
      {
        plugin: require('./routes/url'),
        routes: {
          prefix: '/url'
        }
      }
    ]
  }
};