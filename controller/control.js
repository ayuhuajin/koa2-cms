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
  addCategory: async (ctx) => {
    let name = ctx.request.body.name || '';
    let author = ctx.request.body.age || '';
    await category.create({ 'name': name, 'author':author}, function(error){
        if(error) {
            console.log(error);
        } else {
            ctx.response.body = 'success';
        }
    });
},
};
