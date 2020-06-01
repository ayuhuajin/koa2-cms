// const Axios = require('axios');
const AlipaySdk = require('alipay-sdk').default;
// const fs = require('fs');
const alipaySdk = new AlipaySdk({
  appId: '2021001164691594',
  // privateKey: fs.readFileSync('../config/private-key.pem', 'ascii'),
  privateKey: 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCKBfd7/qElJBLD/LOpaOnfY9P15UPSjanpFM/IBpqs3ekVxztKY5hbzreHLbU/8/FLwW/QSR0hPUX1AmdiP9c1T/v3Bm7H2EzMffiU1uQFPHxbXFUiUHYCAqQwj8RWovUvyD57CSrf6KO2AqqhZmA45qqfryPJcm6p7PKcUKyE1BophzOo3lmmVXzIhd8iC/czhBFzjDcHIQKku1CEYO39NuI9/NTi/E4d5cIhRtg5TJwdzbKdRTOEh4KYvpP7LbHW9sYUN5Oo6Jr+RxZXCsWY3ap7lKzT0BirshA1SL0tIQhgz00oMFrvKZk7GK/Uy2kXN/rmako6ZMmPu1kz6lh5AgMBAAECggEAdmQN1/8fDLO3oQMmvL7wNRz1GGwS1A2N3A9s9z+q93LV10dw9Sse6kkTpdEwMm414OxI09mTMgrT8gig02a9W86C625KIgPIRHQdgNYe+traNKerouZvguPvIHSBTmszc0wJRBImA7ASlTIOWKlvCf/aBWT+hnIwuHM1251bjgbxQKY4/P7NVBlf395ujp9Dv3tJoodHMsaUGJIpStzFcUaai8X1PgSkcboN954Tu7LDkeVoYWUa9puROvaNxgZY6WLHZu1d5E8DBkEhJQ17f6hPmLWmVbU+SpPDIyCeRYKLq+4AIkvYTTuDJdlLCIpqZLVu8JxSLsKRb5AVwS3MMQKBgQDwLFb2tYkAyt7JznsmHIhYk3Wec7zCIapfVOVm3gvI5wc5Q5dKKx9i9j17gSxmvIh+vtLxp16JzhncT0H3TKbhkmEppYAbjEwFMMRmbA4a2XTfGDR204f/Vlz4yuyjoteq3i8SqJXn5BeSGnfKdWB88Gl8vxDT4EbD4X1Z7uxu/QKBgQCTHmJwGEoja/dbd45qlGBypPX8Ig5yslCFohQjb0QZGuK41CQm1i8D1eqS13qjpUHqjhqUe6qYQ2EtUqCk4E9OSS9wkfqasPvyo2ZDoiX5Kn3edcN2xlf+Aq6/C/LQt6wKEPArDNSRk7wyqoPwIBalwGhLdYDJXGeMnjNoZD0OLQKBgQCfag7e+mfRatatxKvhBBdME7SCU/f6MzZOyJ7rxH61/wLAc6i7xhuzKBZvH7JFDubamfaSB7Gsbmyj2sfCSdKK7wonBn8dyeW7nD8AbMB/+c6lNf+8z3L5fG2Bhc/EXZYhCBDepZ+6p58tjvvsGjTNORYLgxa8S6Us50K4qumsUQKBgQCLUfforafv+XurPAI7fj4D86IbXmkORz0oAABQOjtkBuj0HboKqUSmvjrBSpwSQxq0NFSJjr9UKGLrl9cXrHCN85KgaS3ItpgyBHmAzRpm5s2CEUXEwjpsC0BPHdKZw4aBld7K9gCLyDsuQ/pkOQ8ZcqeR5jnK9t389Yg7cMm9FQKBgQDdHUo7ZDwqSJT04oRzqDYlbeyg51uSZitQdBFXpli3G7MIU9jhM33wn8bmf8++0XKh8aTVRENOmnXV9E3d4p0nJLUYHEJc+WONl7Jce5KJg0YIltoVa+9KRbd/1QqoyIN7wgl6i+W/itjOVBtNg0BwxxP2oXoapQEN281Vi2SMqw=='
});


module.exports = {
  createOrder:async(ctx)=>{
    const result = await alipaySdk.exec('alipay.trade.precreate', {
      app_id:'',
      notifyUrl: 'http://notify_url',
      charset:'utf-8',
      sign_type:'RSA2',
      // 通过 bizContent 传递请求参数
      bizContent: {
        tradeNo: '',
        outTradeNo: '',
        operatorId: '',
      },
    });
    
    // 从官方文档看到，result 包含 tradeNo、outTradeNo 2 个 key
    console.log('tradeNo: %s, outTradeNo: %s', result.tradeNo, result.outTradeNo);
      
    ctx.body='index';
  }
  
};