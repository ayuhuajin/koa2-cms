const mongoose = require('mongoose');

let userScheme = new mongoose.Schema({
  account:String,
  password:String,
  repassword:String,
});

let blog = mongoose.model('user',userScheme,'user');

module.exports = blog;
