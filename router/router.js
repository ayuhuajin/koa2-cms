const router = require('koa-router')();
const category = require('../controller/category');
const toolType = require('../controller/toolType');
const blog = require('../controller/blog');
const tools = require('../controller/tools');
const exam = require('../controller/exam');
const question = require('../controller/question');
const user = require('../controller/user');
const permission = require('../controller/permission');
const demo = require('../controller/demo');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');

module.exports = (app) =>{

  // log request URL:
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    await next();
  });

  // 上传文件接口;
  router.post('/upload', koaBody({
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
  }),async(ctx) => {
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
        url: 'http://' + ctx.headers.host  +'/'+ file.name
      }
    };
  });
  // ****************************  DEMO **********************************//
  router.get('/search', demo.search);
  router.get('/list', demo.list);
  router.get('/index/:category/:title',demo.test);

  // ****************************  用户与登录  **********************************//
  router.post('/login',user.login);
  router.get('/userList',user.userList);
  router.post('/addUser',user.addUser);
  router.post('/delUser',user.delUser);
  router.post('/updateUser',user.updateUser);
  router.get('/userView',user.userView);

  // ****************************  权限增删改  **********************************//
  router.post('/addPermission',permission.addPermission);
  router.get('/permissionList',permission.permissionList);

  // ****************************  分类,增,删,改，查  **********************************//
  router.get('/categoryList', category.categoryList);
  router.post('/addCategory', category.addCategory);
  router.post('/delCategory', category.delCategory);
  router.post('/updateCateGory', category.updateCateGory);
  router.get('/categoryView', category.categoryView);
  router.get('/categorySearch', category.categorySearch);
  // 展示
  router.get('/getCategoryList', category.getCategoryList);

  // ****************************  工具分类,增,删,改，查  **********************************//
  router.get('/type/categoryList', toolType.categoryList);
  router.post('/type/addCategory', toolType.addCategory);
  router.post('/type/delCategory', toolType.delCategory);
  router.post('/type/updateCateGory', toolType.updateCateGory);
  router.get('/type/categoryView', toolType.categoryView);
  router.get('/type/categorySearch', toolType.categorySearch);


  // ****************************  博客,增,删,改，查  **********************************//
  router.get('/blogList',blog.blogList);
  router.post('/addBlog',blog.addBlog);
  router.post('/delBlog',blog.delBlog);
  router.post('/updateBlog',blog.updateBlog);
  router.get('/blogView',blog.blogView);

  // 展示
  router.get('/getBlogList',blog.getBlogList);
  router.get('/getBlogView',blog.getBlogView);

  // ****************************  在线工具,增,删,改，查  **********************************//
  router.get('/tools/toolList',tools.toolList);
  router.post('/tools/addTool',tools.addTool);
  router.post('/tools/delTool',tools.delTool);
  router.post('/tools/updateTool',tools.updateTool);
  router.get('/tools/toolView',tools.toolView);

  // ****************************  试卷,增,删,改,查  **********************************//
  router.get('/exam/examList',exam.examList);
  router.post('/exam/addExam',exam.addExam);
  router.post('/exam/delExam',exam.delExam);
  router.post('/exam/updateExam',exam.updateExam);
  router.get('/exam/examView',exam.examView);

  // ****************************  试题,增,删,改,查  **********************************//
  router.get('/question/questionList',question.questionList);
  router.post('/question/addQuestion',question.addQuestion);
  router.post('/question/delQuestion',question.delQuestion);

 
  app.use(router.routes());   /*启动路由*/
  app.use(router.allowedMethods());
};
