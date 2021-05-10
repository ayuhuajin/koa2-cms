const mongoose = require('mongoose');

let ShopScheme = new mongoose.Schema({
  shopName:String,
  img:String,
  content:String,
  categoryId:String,
  time:{ type:Date, default:Date.now }
  // timestamps: {createdAt: 'created', updatedAt: 'updated'}
});

let shop = mongoose.model('shop',ShopScheme,'shop');

module.exports = shop;
