const user = require('../mongo/user');
const jwt = require('jsonwebtoken');
// const secret = require('../utils/secret.js'); //对称加解密

module.exports={
  // 登录
  login:async(ctx)=>{
    let data = ctx.request.body;
    if(!data.account||!data.password) {
     return ctx.body = {
        code: '000002',
        data: null,
        msg: '参数不合法'
      };
    }
    const result = await user.findOne({
      name: data.name,
      password: data.password
    });
    if(result !== null){
      const token = jwt.sign({
        name: result.name,
        _id: result._id
      }, 'my_token', { expiresIn: 1000*60*60 }); //token 1小时过期  或者写"1h"
      return ctx.body = {
        code: '200',
        data: token,
        msg: '登录成功'
      };
    }else{
      return ctx.body = {
        code: '000002',
        data: null,
        msg: '用户名或密码错误'
      };
    }
  },
  userList:async(ctx)=>{
    let result = await user.find({});
    ctx.body = result;
  },
  // 添加用户
  addUser:async(ctx)=>{
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;
    let repassword = ctx.request.body.content;
    try{
      await user.create({'account':account,'password':password,'repassword':repassword});
      ctx.response.body = '成功添加用户';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除分类
  delUser:async(ctx)=>{
    let id = ctx.request.body.id;
    console.log(id);
    let conditions = { '_id': id };
    try{
      await user.deleteOne(conditions);
      ctx.response.body = 'Delete success';
    } catch(err){
      ctx.response.body = '删除用户出错';
    }
   
  },
  // 修改分类名称
  updateUser:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let account = ctx.request.body.account || '';
    let password = ctx.request.body.password || '';
    var conditions = {'_id' : id};
    var update = {$set : { 'account' : account,'password':password}};
    try{
      await user.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 根据Id 获取分类视图
  userView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await user.find(conditions);
    ctx.response.body = result;
  },
};
