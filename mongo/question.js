const mongoose = require('mongoose');

let questionScheme = new mongoose.Schema({
  questionType:Number,
  questionNum:Number,
  subject:Number,
  level:Number,
  testPaper:String,
  questionTitle:String,
  opTions:Array, //选项
  questionDesc:String, //解析
  chooseList:Array,
  answer:Array,
  time:{ type:Date, default:Date.now }
});

let question = mongoose.model('question',questionScheme,'question');

module.exports = question;
