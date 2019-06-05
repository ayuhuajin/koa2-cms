const Koa = require('koa');
const statics = require('koa-static');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const router = require('./router/router.js');
const koajwt = require('koa-jwt');
const cors = require('koa2-cors');

const app = new Koa();

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static';
// 访问路径为 http://localhost:3000/common.css    省略 static
app.use(statics(
  path.join( __dirname,  staticPath)
));
app.use(cors());
// 具体参数我们在后面进行解释

// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。

// 错误处理 返回401
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
  path: [/\/login/]
}));

router(app);

//链接hai_cms 数据库
// mongoose.connect('mongodb://127.0.0.1:27017/hai_cms',{ useNewUrlParser: true });
mongoose.connect('mongodb://193.112.95.253/hai_cms',{ useNewUrlParser: true });
mongoose.connection.on('error', function (error) {
  console.log('数据库连接失败：' + error);
});
mongoose.connection.on('open', function () {
  console.log('------数据库连接成功！------');
});
app.listen(12306);
console.log('[demo] start-quick is starting at port 12306');
