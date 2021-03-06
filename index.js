const Koa = require('koa');
const statics = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require('./router/router.js');
const koajwt = require('koa-jwt');
const cors = require('koa2-cors');
require('./utils/mongo');

const app = new Koa();

// 静态资源目录对于相对入口文件app.js的路径1
const staticPath = './static';
// 访问路径为 http://localhost:3000/common.css    省略 static
app.use(statics(
  path.join( __dirname,  staticPath)
));
app.use(cors());
// 具体参数我们在后面进行解释

// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。

// 错误处理 返回401 中间件对token进行验证
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  });
});

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: ['/login','/getBlogList','/getCategoryList','/getBlogView'] // 不用进行授权的接口,
}));

router(app);

app.listen(12306);
console.log('[demo] start-quick is starting at port 12306');
