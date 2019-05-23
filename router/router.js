const router = require('koa-router')();
const Control = require('../controller/control');

module.exports = (app) =>{
  // log request URL:
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.set('Access-Control-Allow-Origin', 'http://192.168.99.196:10086');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    await next();
  });
  router.get('/index',async(ctx)=>{
    ctx.body='index';
  });
  // ****************************  搜索  **********************************//
  router.get('/search', Control.search);
  router.get('/categoryList', Control.categoryList);
  router.post('/addCategory', Control.addCategory);
  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
};
