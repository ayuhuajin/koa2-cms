const mongoose = require('mongoose');

let toolScheme = new mongoose.Schema({
  title:String,
  img:String,
  desc:String,
  link:String,
  categoryId:String,
  time:{ type:Date, default:Date.now }
  // timestamps: {createdAt: 'created', updatedAt: 'updated'}
});

let tools = mongoose.model('tools',toolScheme,'tools');

module.exports = tools;
