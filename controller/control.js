const cmsModel = require('../mongo/mongo');
const category = require('../mongo/category');
module.exports={
  list:async(ctx)=>{
    await cmsModel.find({},function(error,docs) {
      if(error) {
        console.log('error:'+error);
      } else {
        console.log(docs);
        ctx.response.body = docs;
      }
    });
  },
  search: async (ctx) => {
      await cmsModel.find({'name':'wsinghai'}, function (error, data) {
          if(error) {
              console.log(error);
          } else {
              console.log(data);
              ctx.response.body = data;
          }
      });
  },
  // 分类汇总
  categoryList:async(ctx)=>{
    await category.find({},function(error,data){
      if(error) {
          console.log(error);
      } else {
          console.log(data);
          ctx.response.body = data;
      }
    });
  },
  // 添加分类
  addCategory: async (ctx) => {
    let name = ctx.request.body.name || '';
    let author = ctx.request.body.age || '';
    let result;
    await category.create({ 'name': name, 'author':author}, function(error,data){
        if(error) {
            console.log(error);
        } else {
           result = data;
        }
    });
    console.log(999,result);
    ctx.response.body = '这次成功了';
  },
  delCategory:async(ctx)=>{
    let _id = ctx.request.body._id;
    console.log(_id);
    let conditions = { '_id': _id };

    await category.deleteOne(conditions, function(error){
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = 'Delete success!';
        }
    });
  },
};
