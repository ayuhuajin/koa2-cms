const Koa = require('koa');
const statics = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require('./router/router.js');
const koajwt = require('koa-jwt');
const cors =require('koa2-cors');
require('./utils/mongo');

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
  path: ['/login','/getBlogList','/getCategoryList','/getBlogView','/tools/getToolList','/type/categoryList','/orderSuccess','/ali/createOrder','/ali/revokeOrder','/ali/refundOrder','/order/queryOrderById','/ali/queryOrder','/shop/shopList','/shop/getshopView','/ali/sendEmail','/company/getCompanyList','/company/updateCompany','/company/CompanyView'] // 不用进行授权的接口,
}));

router(app);

app.listen(12306);
// const server = require('http').createServer(app.callback())
// const io = require('socket.io')(server)
// //实时通讯的连接
// io.on("connection",function(socket){
//   //客户端发送过来的数据
//   socket.emit('news',{hello:'world'});
//   //监听客户端发送的内容
//   socket.on('my other event',function (data) {
//       console.log(data)
//   })
// })
var ws = require('nodejs-websocket');
var server1 = ws.createServer(function(conn){
  conn.on('connect', function (str) {
    console.log('收到:'+str);
    conn.sendText('有人加入了');
  });
  conn.on('text', function (str) {
      console.log('收到的信息为:'+str);
      conn.sendText(Math.random().toString());
      borcat();
      // setInterval(()=>{
      //   console.log(8888);
      //   conn.sendText(99)
      // },1000)
  });
  conn.on('close', function (code, reason) {
      console.log('关闭连接');
  });
  conn.on('error', function (code, reason) {
      console.log('异常关闭');
  });
}).listen(11223);
function borcat(){
  server1.connections.forEach(function (conn) {
    conn.sendText('2222');
  });
}

console.log('[demo] start-quick is starting at port 12306');
