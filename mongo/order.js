const mongoose = require('mongoose');

let OrderScheme = new mongoose.Schema({
  orderId:String,
  shopName:String, // 商品名称
  img:String,
  content:String,  // 商品内容
  status:{type:String,default:'未付款'},
  payMoney:{type:Number,default:0},
  time:{ type:Date, default:Date.now },
  notify_time:String, //通知时间
  trade_no:String, //支付宝交易号。支付宝交易凭证号。
  buyer_id:String, //买家支付宝用户号。买家支付宝账号对应的支付宝唯一用户号
  buyer_logon_id:String, //买家支付宝账号。
  app_id:String, //开发者的 app_id。支付宝分配给开发者的应用 APPID
  out_trade_no:String, //商户订单号
  trade_status:String, //交易状态。交易目前所处的状态。
  subject:String, //订单标题
  body:String, //商品描述
  gmt_create:String, //交易创建时间
  gmt_payment:String, //交易付款时间
  buyer_pay_amount:String, //付款金额
});

let order = mongoose.model('order',OrderScheme,'order');

module.exports = order;
