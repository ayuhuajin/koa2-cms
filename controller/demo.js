const cmsModel = require('../mongo/demo');

module.exports = {
  // 获取GET请求数据源头
  // http://localhost:12306/index/111/222?category=1&title=2
  test:async(ctx)=>{
    console.log(ctx.request.url); // /index/111/222?category=1&title=2
    console.log(ctx.query); // { category: '1', title: '2' }
    console.log(ctx.querystring); // category=1&title=2
    ctx.body='index';
  },
  list:async(ctx)=>{
    await cmsModel.find({},function(error,docs) {
      if(error) {
        console.log('error:'+error);
      } else {
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
};