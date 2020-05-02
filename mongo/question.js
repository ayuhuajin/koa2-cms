const mongoose = require('mongoose');

let questionScheme = new mongoose.Schema({
  questionType:Number,
  questionNum:String,
  subject:Number,
  level:String,
  TestPaper:String,
  title:String,
  opTions:Array, //选项
  answer:String,
  desc:String, //解析
  time:{ type:Date, default:Date.now }
});

let question = mongoose.model('question',questionScheme,'question');

module.exports = question;
