const router = require('koa-router')();
const Control = require('../controller/control');

module.exports = (app) =>{


  // log request URL:
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    await next();
  });
  router.get('/index',async(ctx,next)=>{
    ctx.body='index';
    await next();
  });
  // ****************************  搜索  **********************************//
  router.get('/search', Control.search);
  router.get('/categoryList', Control.categoryList);
  router.post('/addCategory', Control.addCategory);
  router.delete('/delCategory', Control.delCategory);
  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
};
