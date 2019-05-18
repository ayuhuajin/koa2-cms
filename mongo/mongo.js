const mongoose = require('mongoose');

let cmsSchema = new mongoose.Schema({
  name:String,
  age:Number
});
// 创建model 
let cmsModel = mongoose.model('test',cmsSchema,'test');

// 将模型[构造函数]导出
module.exports = cmsModel;

// 当前页面创建
// var TestEntity = new cmsModel({
//   name : 'Lenka',
//   age  : 36,
//   email: 'lenka@qq.com'
// });
// TestEntity.save(function(error,doc){
//     if(error){
//         console.log('error :' + error);
//     }else{
//         console.log(doc);
//     }
// });





