const user = require('../mongo/user');
const jwt = require('jsonwebtoken');

module.exports={
  // 添加用户
  addUser:async(ctx)=>{
    console.log(ctx.request.body.account);
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
      }, 'my_token', { expiresIn: '2min' });
      return ctx.body = {
        code: '000001',
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
  }
};
