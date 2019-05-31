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
  // 分类列表
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
    console.log(1111,ctx.request.body.name);
    let name = ctx.request.body.name || '';
    let author = ctx.request.body.age || '';
    await category.create({ 'name': name, 'author':author}, function(error){
        if(error) {
            console.log(error);
        } else {
           console.log('添加成功');
        }
    });
    ctx.response.body = 'success';
  },
  // 删除分类
  delCategory:async(ctx)=>{
    let id = ctx.request.body.id;
    let conditions = { '_id': id };
    await category.deleteOne(conditions, function(error){
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = 'Delete success!';
        }
    });
  },
  // 修改分类名称
  updateCateGory:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let name = ctx.request.body.name || '';
    var conditions = {'_id' : id};
    var update = {$set : { 'name' : name}};
    await category.update(conditions, update, function(error){
      if(error) {
          console.log(1111222223333,error);
      } else {
          ctx.response.body = '编辑成功';
      }
    });
  },
  // 根据Id 获取分类视图
  categoryView:async(ctx)=>{
    // let name = ctx.query.name || '';
    // console.log(ctx.query.name,name);
    // let { name = '1111'} = ctx.request.query;
    // let _id = ctx.request.body._id;
    // let _id = ctx.request.url;
    let id = ctx.query.id;
    let conditions = { '_id': id };
    await category.find(conditions, function (error, data) {
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = data;
        }
    });
  }

};
