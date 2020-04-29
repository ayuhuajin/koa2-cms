const mongoose = require('mongoose');
//链接hai_cms 数据库
// mongoose.connect('mongodb://127.0.0.1:27017/hai_cms',{ useNewUrlParser: true });
// mongoose.connect('mongodb://193.112.95.253/hai_cms',{ useNewUrlParser: true });
mongoose.connect('mongodb://账号:密码@ip/数据库',{ useNewUrlParser: true });
mongoose.connection.on('error', function (error) {
  console.log('数据库连接失败：' + error);
});
mongoose.connection.on('open', function () {
  console.log('------数据库连接成功！------');
});