const User = require('../models/user')

const validate = async (decoded, request, h) => {
  if (decoded) {
    return { isValid: true };
  }
  return { isValid: false };
};

module.exports.register = (server, options) => {
  server.register(require('hapi-auth-jwt2'))
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET,
    validate 
  })
  server.auth.default('jwt');
}

module.exports.pkg = {
  name: 'auth'
}