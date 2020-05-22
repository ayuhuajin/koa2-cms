const cmsModel = require('../mongo/demo');
const Axios = require('axios');

module.exports = {
  // 获取GET请求数据源头
  // http://localhost:12306/index/111/222?category=1&title=2
  test:async(ctx)=>{
    console.log(ctx.request.url); // /index/111/222?category=1&title=2
    console.log(ctx.query); // { category: '1', title: '2' }
    console.log(ctx.querystring); // category=1&title=2
    ctx.body='index';
  },
  list:async(ctx)=>{
    await cmsModel.find({},function(error,docs) {
      if(error) {
        console.log('error:'+error);
      } else {
        ctx.response.body = docs;
      }
    });
  },
  search: async (ctx) => {
      await cmsModel.find({'name':'wsinghai'}, function (error, data) {
          if(error) {
              console.log(error);
          } else {
              console.log(data);
              ctx.response.body = data;
          }
      });
  },
  wxtoken:async(ctx)=>{
    console.log(ctx.query.code,3546345345);
    let code = ctx.query.code;
     await Axios.get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxb534ddc40d15ecfc&secret=ae877da26da8e05dbf26ba9014b090e3&code=${code}&grant_type=authorization_code`
    ).then(response => {
      ctx.response.body = response.data;
      Axios.get(
        ` https://api.weixin.qq.com/sns/auth?access_token=${response.data.access_token}&openid=${response.data.openid}&lang=zh_CN`
      ).then(response => {
        // ctx.response.body = response.data;
        console.log(response,55789);
      });
    });
    // console.log(result,99998);
    // ctx.response.body = result.data;
    // ctx.response.body
  },
  createWxMenu:async(ctx)=>{
    console.log('jin');

   await Axios.post(
      `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=33_Ip0qPKB3cd4feoD-5ZkiHlKqaAb8EDCm7r-HLVuRPILCWAWgd47hvkIokHwZwfo5KUKDwTuDor_LrEmEXUyWpcgqJ4rg6xtKsDymzy8w9HcCuWcq-x-D4E0KqTgEeFCveS5rm0MXolhcMhNdYTDdADANIS`,
      {
        button: [
          {
            type: 'click',
            name: '士大夫士大夫',
            key: 'V1001_TODAY_MUSIC'
          },
          {
            name: '水水水水',
            sub_button: [
              {
                type: 'view',
                name: '搜嘟嘟索',
                url: 'http://www.soso.com/'
              },
              
              {
                type: 'click',
                name: '顶顶顶顶',
                key: 'V1001_GOOD'
              }
            ]
          }
        ]
      }
    ).then(response => {
      console.log(response.data,2345);
      
      ctx.response.body = response.data;
    });
  }
};