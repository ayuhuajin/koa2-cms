const Koa = require('koa');
const statics = require('koa-static');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const router = require('./router/router.js');
const app = new Koa();

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static';
// 访问路径为 http://localhost:3000/common.css    省略 static
app.use(statics(
  path.join( __dirname,  staticPath)
));
// parse request body:
app.use(bodyParser());  //bodypaser要在router之前加载才能生效。

router(app);

var db =mongoose.connect('mongodb://127.0.0.1:27017/hai_cms');
console.log(db);
mongoose.connection.on('error', function (error) {
  console.log('数据库连接失败：' + error);
});
mongoose.connection.on('open', function () {
  console.log('------数据库连接成功！------');
});
app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
