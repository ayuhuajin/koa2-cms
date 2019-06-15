const mongoose = require('mongoose');

// 分类
let categorySchema = new mongoose.Schema({
  name:String,
  author:String,
  date : String,
  // time:{ type:Date, default:Date.now }
});
// 创建model
let category = mongoose.model('category',categorySchema,'category');

// categorySchema.statics = {
//   addNumber(id, cb) {
//     this.findOneAndUpdate(
//       { _id: id },
//       {
//         $inc: {
//           number: 1 //每次自增长1
//         }
//       },
//       {
//         new: true //设置true 获取的是更新之后的值
//       },
//       cb
//     );
//   }
// };
// categorySchema.addNumber('dataClassId', (err, data) => {
//   if (err) {
//     return;
//   }
//    const number= data.number;  //这个获取到的就是自增长之后的值
// });


// 将模型[构造函数]导出
module.exports = category;




