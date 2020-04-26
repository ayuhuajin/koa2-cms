const mongoose = require('mongoose');

let examScheme = new mongoose.Schema({
  title:String,
  subject:Number,
  level:Number,
  time:{ type:Date, default:Date.now }
});

let exam = mongoose.model('exam',examScheme,'exam');

module.exports = exam;
