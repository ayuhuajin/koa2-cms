const mongoose = require('mongoose');

let blogScheme = new mongoose.Schema({
  title:String,
  img:String,
  content:String,
  categoryId:String,
  time:{ type:Date, default:Date.now }
  // timestamps: {createdAt: 'created', updatedAt: 'updated'}
});

let tools = mongoose.model('tools',blogScheme,'tools');

module.exports = tools;
