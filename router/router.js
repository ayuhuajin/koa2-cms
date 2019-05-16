const router = require('koa-router')();

module.exports = (app) =>{
  // log request URL:
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
  });
  router.get('/index',async(ctx)=>{
    ctx.body='index';
  });
  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
};
