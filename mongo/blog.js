const mongoose = require('mongoose');

let blogScheme = new mongoose.Schema({
  title:String,
  img:String,
  content:String,
  categoryId:String,
  time:{ type:Date, default:Date.now }
  // timestamps: {createdAt: 'created', updatedAt: 'updated'}
});

let blog = mongoose.model('blog',blogScheme,'blog');

module.exports = blog;
