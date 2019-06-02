const router = require('koa-router')();
const Control = require('../controller/control');
const blog = require('../controller/blog');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

module.exports = (app) =>{


  // log request URL:
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    await next();
  });
  //koaBody   配置
  app.use(koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, '../static'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
        console.log(`name: ${name}`);
        console.log(file);
      },
    }
  }));

  // 获取GET请求数据源头
  // http://localhost:12306/index/111/222?category=1&title=2
  router.get('/index/:category/:title',async(ctx,next)=>{
    console.log(ctx.request.url); // /index/111/222?category=1&title=2
    console.log(ctx.query); // { category: '1', title: '2' }
    console.log(ctx.querystring); // category=1&title=2
    ctx.body='index';
    await next();
  });

  // 上传文件接口;
  router.post('/upload', async(ctx) => {
    const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    // var myDate = new Date();
    // var newFilename = file.name.split('.')[0] + '_' + myDate.getTime() + '.' + file.name.split('.')[1];
    var targetPath = path.join(__dirname, '../static') + `/${file.name}`;
    // if (!fs.existsSync(targetPath)) { // 检查是否有“public/upload/”文件夹
    //   fs.mkdirSync(targetPath); // 没有就创建
    // }
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //ctx.redirect('/')
    //返回保存的路径
    return ctx.body = {
      code: 200,
      data: {
        url: 'http://' + ctx.headers.host  + file.name
      }
    };
  });

  router.get('/search', Control.search);
  // ****************************  分类,增,删,改，查  **********************************//
  router.get('/categoryList', Control.categoryList);
  router.post('/addCategory', Control.addCategory);
  router.post('/delCategory', Control.delCategory);
  router.post('/updateCateGory', Control.updateCateGory);
  router.get('/categoryView', Control.categoryView);
  router.get('/categorySearch', Control.categorySearch);

  // ****************************  博客,增,删,改，查  **********************************// 
  router.get('/blogList',blog.blogList);
  router.post('/addBlog',blog.addBlog);
  router.post('/delBlog',blog.delBlog);
  router.post('/updateBlog',blog.updateBlog);
  router.get('/blogView',blog.blogView);

  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
};
