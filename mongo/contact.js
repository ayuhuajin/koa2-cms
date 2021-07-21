const mongoose = require('mongoose');

let ContactScheme = new mongoose.Schema({
  name:String,
  nickName:String,
  phone:String,
  addr:String,
  province:String,
  county:String,
  city:String,
  type:String,
  desc:String,
  content:String,
  categoryId:String,
  isAddContactWX:{type:Boolean,default:false}, // 是否添加微信
  time:{ type:Date, default:Date.now }
});

let contact = mongoose.model('contact',ContactScheme,'contact');

module.exports = contact;
