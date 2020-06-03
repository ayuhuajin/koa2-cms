// const Axios = require('axios');
const AlipaySdk = require('alipay-sdk').default;
// const fs = require('fs');
const alipaySdk = new AlipaySdk({
  appId: '2021001164691594',
  // privateKey: fs.readFileSync('../config/private-key.pem', 'ascii'),
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEAgn7+Yq67uXjrCkhNy5HDwaI8ENeUVCyOHGjNExAhOtrD5SZy/m4m7X+Ap4bv5Amfx8FcCrNznoTizU0VB0bPMhP7WbL7edBXV3yT4xhue87kTui58Ecb4B2Ovyy4h2KavGKdeveKceX8dPBiRhyj7RTtW0OeRXOVwBmdMJ3pI5+8FN8JUtp/+58VYvy216MciiXTIRsCWuACDH6JS9aOtARWJVSDiWOJJQvJf0QX2l0acB0qIzRYBDMY71asc1Og/GlormC7KLDTY+aDGLfEbE1Gf25RwUc/AXjAeIUpWI6aAwM/M5YKVD87cPWZ/GzHg1bF1iERyt5HxsjPi5C3CQIDAQABAoIBAAc3TonWb7sJ3LVs2iBvpwuGFRw5T5J4BEO959kuAyhmAH8jaSh4nt5zNoINDCboAVXic1yEH9icMI55vLfySnLSeAu1wgIyayIDWYotR67A+g8C/4Ux6XCzMbmQl4OlCDlympK6LYWu2g79W/HUk5wAlD9/tbjRc25z/CU8FjBKB7QrFl1beC1quDkYYFEra0yNxjcF9Sa9D2aEIENCu42mFOqg7gFhxYOpjuZqg4HQHGjYDnFSCtMjlKfpdzDdj7hOcAYNh7XZX3c75OyBMEW0ZwWA4J3EPNXMq+rgf0V8SAlEqSxfwxRJg55YC6c+8COLtVNSXBgJ+50p+L4hFAECgYEA+3Jly1mKwfekUpEPXOaNKiE1MhxntKdec6ukFmCJJGIyW5NgHhCypq30sq42S/1sNMecSPyWB7Ni0CyiBpCtNFOv/pI+BLFdyRmds579hSfSBVcn5vaeQn3PPQWKtukPFq90gH0IciZgAYGKdfynRmhIYDC5mDBioUDD/fqAfjECgYEAhNvrN7njab/113XFIMFaAszkAC9a2YUCiQokAD4p5X04FaVSKWfAyTdMB49mYnHgoldgJyDu1VF9yn3kvyaxr354ZveTVHYeG8QdAJzl/Tn6o1qT+LufwrpfXHzWsU54V2uGqSpWQEyhEdJWp7jywetQdGhksNDe2pMv6mzEWFkCgYEAratAtafd18TEYSbB1qeCnrOa+0Z1NmhXK0tEpRP+BPwxzeBHhdyAl/EUTolXBTs/DmFEB4E12pHC0QfSzPgGOVsH9qtpXHJo1Wn060gH0H1FaNzeuX5ipoggqAP44AaunjuHGuvA9p6cts2TJZTgsBd8zbs5pOzeYoPKGtR3BTECgYAcyOT6atzZkYx7BPoTsbCFwMx5OclOLWIyPK82GkHLhci779iQPfln3wIq9SeyloebxKCBecIlF4XQdFw2CfUfV6BQdr1F5F17mI7MDjJKHeCuubYrgsMHVofIqwd83Mp37kT7q7+KKNAQ42iA6DI4T3pb7i46nNZbtt3/xVb46QKBgFR/s+wGQg00g7rkzwsFPd0hEclgxUgaFKmV0lRZHa0QKLY8y+yqG+ac4d8eG/zOE9WhAi3jPryETFyPMA0EWqhl9uHuC5T2FTuoOr3gKj7vIv5yqvDm1De97cEiHKxkdw1v2dISaXpw+tfa1S59iageIk357fExO4jr1eUtEOJz
  -----END RSA PRIVATE KEY-----`,
  signType:'RSA2',
  alipayPublicKey:`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgn7+Yq67uXjrCkhNy5HDwaI8ENeUVCyOHGjNExAhOtrD5SZy/m4m7X+Ap4bv5Amfx8FcCrNznoTizU0VB0bPMhP7WbL7edBXV3yT4xhue87kTui58Ecb4B2Ovyy4h2KavGKdeveKceX8dPBiRhyj7RTtW0OeRXOVwBmdMJ3pI5+8FN8JUtp/+58VYvy216MciiXTIRsCWuACDH6JS9aOtARWJVSDiWOJJQvJf0QX2l0acB0qIzRYBDMY71asc1Og/GlormC7KLDTY+aDGLfEbE1Gf25RwUc/AXjAeIUpWI6aAwM/M5YKVD87cPWZ/GzHg1bF1iERyt5HxsjPi5C3CQIDAQAB
  -----END PUBLIC KEY-----`,
});


module.exports = {
  createOrder:async(ctx)=>{
    console.log(ctx.request.body,9999);
    
    // console.log(alipaySdk.exec(),56767);
    // const result = await alipaySdk.exec('alipay.system.oauth.token', {
    //   // 请求参数
    //   grantType: 'authorization_code',
    //   code: 'code',
    //   refreshToken: 'token'
    // });
    
    // result 为 API 介绍内容中 “响应参数” 对应的结果
    // console.log(result);

    // 需要业务参数=>bizContent
    // const result = await alipaySdk.exec('alipay.trade.precreate', {
    //   app_id:'2021001164691594',
    //   sign_type:'RSA2',
    //   app_private_key_string:'',
    //   alipay_public_key_string:'',
    //   notifyUrl: 'https://wulilang.com',
    //   charset:'utf-8',
    //   // subject:"test subject",
    //   // out_trade_no:out_trade_no,
    //   // total_amount:0.1,
    //   // 通过 bizContent 传递请求参数
    //   bizContent: {
    //     tradeNo: '',
    //     outTradeNo: '',
    //     operatorId: '',
    //   },
    // });
    console.log(alipaySdk.exec,2342342342342349999999);
    let {out_trade_no,subject,total_amount} = ctx.request.body;
    try{
      const result = await alipaySdk.exec('alipay.trade.precreate',{
        appId: '2021001164691594',
        notifyUrl:'https://wulilang.com/ali/hai',
        alipayPublicKey:`-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgn7+Yq67uXjrCkhNy5HDwaI8ENeUVCyOHGjNExAhOtrD5SZy/m4m7X+Ap4bv5Amfx8FcCrNznoTizU0VB0bPMhP7WbL7edBXV3yT4xhue87kTui58Ecb4B2Ovyy4h2KavGKdeveKceX8dPBiRhyj7RTtW0OeRXOVwBmdMJ3pI5+8FN8JUtp/+58VYvy216MciiXTIRsCWuACDH6JS9aOtARWJVSDiWOJJQvJf0QX2l0acB0qIzRYBDMY71asc1Og/GlormC7KLDTY+aDGLfEbE1Gf25RwUc/AXjAeIUpWI6aAwM/M5YKVD87cPWZ/GzHg1bF1iERyt5HxsjPi5C3CQIDAQAB
        -----END PUBLIC KEY-----`,
        bizContent:{
          out_trade_no: out_trade_no,// 必填 商户订单主键, 就是你要生成的
          subject: subject,      // 必填 商品概要
          total_amount: total_amount,    // 必填 多少钱
        }
      });
      ctx.body=result;
    } catch(err) {
      console.log(err,'失败');
    }
    
    
    
    // 从官方文档看到，result 包含 tradeNo、outTradeNo 2 个 key
    // console.log('tradeNo: %s, outTradeNo: %s', result.tradeNo, result.outTradeNo);
      
    
  }
  
};