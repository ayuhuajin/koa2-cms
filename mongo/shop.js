const mongoose = require('mongoose');

let ShopScheme = new mongoose.Schema({
  shopName:String, // 商品名称
  img:String,
  content:String,  // 商品内容
  categoryId:String,
  shopSecret: String, // 商品密钥
  onTrial: { type:Boolean, default:false }, // 是否试用
  isPurchase: { type:Boolean, default:false }, // 是否购买
  isWechatFriend: { type:Boolean, default:false }, // 是否微信好友
  OfficialAccount: { type:Boolean, default:false }, // 是否关注公众号
  isDiscount: { type:Boolean, default:false }, // 是否有优惠
  isGroupBy: { type:Boolean, default:false }, // 是否团购
  buyCount:{ type:Number, default:0 } , // 被购买几次
  time:{ type:Date, default:Date.now },
});

let shop = mongoose.model('shop',ShopScheme,'shop');

module.exports = shop;
