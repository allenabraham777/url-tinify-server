const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const userUrlSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  url: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const UserUrl = mongoose.model('UserUrl', userUrlSchema);

module.exports = UserUrl