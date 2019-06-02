const mongoose = require('mongoose');

let blogScheme = new mongoose.Schema({
  title:String,
  img:String,
  content:String,
  category:String
});

let blog = mongoose.model('blog',blogScheme,'blog');

module.exports = blog;