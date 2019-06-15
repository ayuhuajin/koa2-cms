const mongoose = require('mongoose');

let permissionScheme = new mongoose.Schema({
  permissionId:Number,
  permissionName:String,
  path:String,
  meta:Object,
});

let blog = mongoose.model('permission',permissionScheme,'permission');

module.exports = blog;
