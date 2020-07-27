const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const shortid = require('shortid');
 
const urlSchema = new Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url