// const Axios = require('axios');
const AlipaySdk = require('alipay-sdk').default;
// const fs = require('fs');
const alipaySdk = new AlipaySdk({
  appId: '2021001164691594',
  // privateKey: fs.readFileSync('../config/private-key.pem', 'ascii'),
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCKBfd7/qElJBLD/LOpaOnfY9P15UPSjanpFM/IBpqs3ekVxztKY5hbzreHLbU/8/FLwW/QSR0hPUX1AmdiP9c1T/v3Bm7H2EzMffiU1uQFPHxbXFUiUHYCAqQwj8RWovUvyD57CSrf6KO2AqqhZmA45qqfryPJcm6p7PKcUKyE1BophzOo3lmmVXzIhd8iC/czhBFzjDcHIQKku1CEYO39NuI9/NTi/E4d5cIhRtg5TJwdzbKdRTOEh4KYvpP7LbHW9sYUN5Oo6Jr+RxZXCsWY3ap7lKzT0BirshA1SL0tIQhgz00oMFrvKZk7GK/Uy2kXN/rmako6ZMmPu1kz6lh5AgMBAAECggEAdmQN1/8fDLO3oQMmvL7wNRz1GGwS1A2N3A9s9z+q93LV10dw9Sse6kkTpdEwMm414OxI09mTMgrT8gig02a9W86C625KIgPIRHQdgNYe+traNKerouZvguPvIHSBTmszc0wJRBImA7ASlTIOWKlvCf/aBWT+hnIwuHM1251bjgbxQKY4/P7NVBlf395ujp9Dv3tJoodHMsaUGJIpStzFcUaai8X1PgSkcboN954Tu7LDkeVoYWUa9puROvaNxgZY6WLHZu1d5E8DBkEhJQ17f6hPmLWmVbU+SpPDIyCeRYKLq+4AIkvYTTuDJdlLCIpqZLVu8JxSLsKRb5AVwS3MMQKBgQDwLFb2tYkAyt7JznsmHIhYk3Wec7zCIapfVOVm3gvI5wc5Q5dKKx9i9j17gSxmvIh+vtLxp16JzhncT0H3TKbhkmEppYAbjEwFMMRmbA4a2XTfGDR204f/Vlz4yuyjoteq3i8SqJXn5BeSGnfKdWB88Gl8vxDT4EbD4X1Z7uxu/QKBgQCTHmJwGEoja/dbd45qlGBypPX8Ig5yslCFohQjb0QZGuK41CQm1i8D1eqS13qjpUHqjhqUe6qYQ2EtUqCk4E9OSS9wkfqasPvyo2ZDoiX5Kn3edcN2xlf+Aq6/C/LQt6wKEPArDNSRk7wyqoPwIBalwGhLdYDJXGeMnjNoZD0OLQKBgQCfag7e+mfRatatxKvhBBdME7SCU/f6MzZOyJ7rxH61/wLAc6i7xhuzKBZvH7JFDubamfaSB7Gsbmyj2sfCSdKK7wonBn8dyeW7nD8AbMB/+c6lNf+8z3L5fG2Bhc/EXZYhCBDepZ+6p58tjvvsGjTNORYLgxa8S6Us50K4qumsUQKBgQCLUfforafv+XurPAI7fj4D86IbXmkORz0oAABQOjtkBuj0HboKqUSmvjrBSpwSQxq0NFSJjr9UKGLrl9cXrHCN85KgaS3ItpgyBHmAzRpm5s2CEUXEwjpsC0BPHdKZw4aBld7K9gCLyDsuQ/pkOQ8ZcqeR5jnK9t389Yg7cMm9FQKBgQDdHUo7ZDwqSJT04oRzqDYlbeyg51uSZitQdBFXpli3G7MIU9jhM33wn8bmf8++0XKh8aTVRENOmnXV9E3d4p0nJLUYHEJc+WONl7Jce5KJg0YIltoVa+9KRbd/1QqoyIN7wgl6i+W/itjOVBtNg0BwxxP2oXoapQEN281Vi2SMqw==
  -----END RSA PRIVATE KEY-----`,
  signType:'RSA2',
  alipayPublicKey:`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAigX3e/6hJSQSw/yzqWjp32PT9eVD0o2p6RTPyAaarN3pFcc7SmOYW863hy21P/PxS8Fv0EkdIT1F9QJnYj/XNU/79wZux9hMzH34lNbkBTx8W1xVIlB2AgKkMI/EVqL1L8g+ewkq3+ijtgKqoWZgOOaqn68jyXJuqezynFCshNQaKYczqN5ZplV8yIXfIgv3M4QRc4w3ByECpLtQhGDt/TbiPfzU4vxOHeXCIUbYOUycHc2ynUUzhIeCmL6T+y2x1vbGFDeTqOia/kcWVwrFmN2qe5Ss09AYq7IQNUi9LSEIYM9NKDBa7ymZOxiv1MtpFzf65mpKOmTJj7tZM+pYeQIDAQAB
  -----END PUBLIC KEY-----`,
});


module.exports = {
  createOrder:async(ctx)=>{
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
    try{
      const result = await alipaySdk.exec('alipay.trade.precreate',{
        tradeNo: '12321344353456',      // 必填 商户订单主键, 就是你要生成的
        subject: '女装',      // 必填 商品概要
        totalAmount: 0.5,    // 必填 多少钱
        body: '黑丝吊带小蜡烛', // 可选 订单描述, 可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
        timeExpress: 5 
      });
      console.log(result);
    } catch(err) {
      console.log(err,'失败');
    }
    
    
    
    // 从官方文档看到，result 包含 tradeNo、outTradeNo 2 个 key
    // console.log('tradeNo: %s, outTradeNo: %s', result.tradeNo, result.outTradeNo);
      
    ctx.body='index';
  }
  
};