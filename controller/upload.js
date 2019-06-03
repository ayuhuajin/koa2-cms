const fs = require('fs');
const path = require('path');
module.exports={
  upload:async(ctx)=>{
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
  }
};