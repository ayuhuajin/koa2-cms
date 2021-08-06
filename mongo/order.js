const mongoose = require('mongoose');

let OrderScheme = new mongoose.Schema({
  orderId:String,
  shopName:String, // 商品名称
  img:String,
  content:String,  // 商品内容
  payMoney:{type:Number,default:0},
  time:{ type:Date, default:Date.now },
});

let order = mongoose.model('order',OrderScheme,'order');

module.exports = order;
