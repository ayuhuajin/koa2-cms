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

  // 获取GET请求数据源头
  // http://localhost:12306/index/111/222?category=1&title=2
  router.get('/index/:category/:title',async(ctx,next)=>{
    console.log(ctx.request.url); // /index/111/222?category=1&title=2
    console.log(ctx.query); // { category: '1', title: '2' }
    console.log(ctx.querystring); // category=1&title=2
    ctx.body='index';
    await next();
  });
  router.get('/search', Control.search);
  // ****************************  分类,增,删,改，查  **********************************//
  router.get('/categoryList', Control.categoryList);
  router.post('/addCategory', Control.addCategory);
  router.post('/delCategory', Control.delCategory);
  router.post('/updateCateGory', Control.updateCateGory);
  router.get('/categoryView', Control.categoryView);
  
  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
};
