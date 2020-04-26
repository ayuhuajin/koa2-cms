const mongoose = require('mongoose');

// 分类
let categorySchema = new mongoose.Schema({
  name:String,
  author:String,
  date : String,
});
// 创建model
let category = mongoose.model('toolType',categorySchema,'toolType');

// 将模型[构造函数]导出
module.exports = category;




