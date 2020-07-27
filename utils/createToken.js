const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.SECRET);
}

module.exports = {createToken}