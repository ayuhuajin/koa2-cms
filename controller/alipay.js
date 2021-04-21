// const Axios = require('axios');
const blog = require('../mongo/blog');
const AlipaySdk = require('alipay-sdk').default;
// const fs = require('fs');
const alipaySdk = new AlipaySdk({
  appId: '2016102400749295',
  // privateKey: fs.readFileSync('../config/private-key.pem', 'ascii'),
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCDblfHzbsJKcAJNN2eymY5F39ZUdZZhtlIulVq+6SQbj/VsdHLHTrLGdKFfj4QJ0fGBAJwjvlX7Gx2ZRk3ubMmn3VVzGyM+DWNEKfGaUe7iiK3L9hd9tCYVLdpMlJpCW6nLaaG/itP4zc6IEsguhEFmcs88HaahtILW2kHbfmStuQpsP7ZqMPESV8sApP8TfIgsiEgf8Yjxn9a84UZHu6PdBG25gMUtl2OQCp14ySjCM9zNLuLBljb8PVFka2Aqe40xrnD/zsOi2eLTnR9EEt+S6rTRNELoMQzztuav/OgfZZtrHyZjVYn0XQYGblapyA+7cDbGz8AMsUIIUAbyhiDAgMBAAECggEAbBmCi2zT7Cpxr2DS8zrHryd7b+yWn5YA+wd/H/oPlVeIm2uhAS1uYQRBGdkGlOSp7Nz5YLjHrqBfaVWn0ySijB7VNBdqJNw1t2u+gruu6zonaYIptMc/NDthi11/WLMQVuJ+OEOvPgrFLsLG6AkB3RhsiBfDhT9kXUD29sxmXFtlaingktZYM2gyoQG3wu1ioC+JYVZiB8NnLnJb5XdswlQ1+7nle0unliClqjBFj7iEeLgDCEDbURx34M3ehOifcQDD0N/yoATjEmLEcsefeEkrms6DG97BWI1E1fvEXQKKQ7Bmyk7zCKc18bJwLJoF5mw6Yi2lU6Dq2xXMngcnmQKBgQDycgoSk2NXLkU4qLBRZq8YI4fAM+k+R+g/V0eWTQQq4tnqszG4USg08IKkaJPRlEqaSVmcIF0e1XpUziPFp7mdmm+xgWjuwoV0xHLdb4nmLt57SbIvdN774f8z7PAPI16hjpa4tbBVQ5CUBwCJ2B5qqRPEOpPnLBfH4i1huigPbwKBgQCKx22AMSHv+wRfnMytrW7DNDatMX3XnNkXtT6LwvS3hGswq4ekpc9aO5wZaI7UAU6TOzBBLY60OpoW9aWswNcao4FNOKN0tWvgdSIQtltENBnU7Rfc6QUODnHOuyPywHr1R13KVhM0jltflJbzoErB5yFDywBUENjyq91eN+W+LQKBgCfZfrZW63kk7dPGRlTa3+TD0khRQAEwqIfgvK+DsS+rYc4l7gIxtL4e2hpT5hgIm8qIS+ZRm3y58gWGbHLMgsHY5Ir0jl7QMkdjEs46yxu+kGsLTfJm70/PcbcDNuIGGkPLwBJUKsuY82ahUAFYOIeniswyJKVWpgIAtxzdEECZAoGAOmpLe0QzJtKgOqbDuO9hyiT2RtyoPdO1xbbyxt2fKIhCnk/1Xqa0qySgRkmupSqPqoWlgCnvAYoRRkzMGfVqFbpxONH4a63Z5LcpSaOYsxLDNM8/1ir3h70oxn4bWZkPqKMLpZmpp9usNoVTLOVx0kC5zdFrJ/eXej5BheE9gVkCgYADJhRRvwW2tG+bsmH5wJQ3YJaTQyFqT21TbCYy7aqnkaQ1m74hyirfNPlQDLjqI0WkwHFENrypbnhOqkGSr43PYtLNDJEzPMdP2/g1esvowu14iisCJiFdY29weJNRHCYkVhv/kmxJlmgWjP78QNZs6a143n7FHf5A1HR1cqUMxg==
  -----END RSA PRIVATE KEY-----`,
  signType:'RSA2',
  alipayPublicKey:`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg25Xx827CSnACTTdnspmORd/WVHWWYbZSLpVavukkG4/1bHRyx06yxnShX4+ECdHxgQCcI75V+xsdmUZN7mzJp91VcxsjPg1jRCnxmlHu4oity/YXfbQmFS3aTJSaQlupy2mhv4rT+M3OiBLILoRBZnLPPB2mobSC1tpB235krbkKbD+2ajDxElfLAKT/E3yILIhIH/GI8Z/WvOFGR7uj3QRtuYDFLZdjkAqdeMkowjPczS7iwZY2/D1RZGtgKnuNMa5w/87Dotni050fRBLfkuq00TRC6DEM87bmr/zoH2Wbax8mY1WJ9F0GBm5WqcgPu3A2xs/ADLFCCFAG8oYgwIDAQAB
  -----END PUBLIC KEY-----`,
});



module.exports = {
  createOrder:async(ctx)=>{
    let {out_trade_no,subject,total_amount} = ctx.request.body;
    try{
      const result = await alipaySdk.exec('alipay.trade.precreate',{
        appId: '2016102400749295',
        return_url:'https://www.baidu.com',
        notify_url:'https://api.wulilang.com/orderSuccess',
        alipayPublicKey:`-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg25Xx827CSnACTTdnspmORd/WVHWWYbZSLpVavukkG4/1bHRyx06yxnShX4+ECdHxgQCcI75V+xsdmUZN7mzJp91VcxsjPg1jRCnxmlHu4oity/YXfbQmFS3aTJSaQlupy2mhv4rT+M3OiBLILoRBZnLPPB2mobSC1tpB235krbkKbD+2ajDxElfLAKT/E3yILIhIH/GI8Z/WvOFGR7uj3QRtuYDFLZdjkAqdeMkowjPczS7iwZY2/D1RZGtgKnuNMa5w/87Dotni050fRBLfkuq00TRC6DEM87bmr/zoH2Wbax8mY1WJ9F0GBm5WqcgPu3A2xs/ADLFCCFAG8oYgwIDAQAB
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


  },
  orderSuccess:async(ctx)=>{
    let title = '支付宝123';
    let categoryId = 456885224;
    let content = '4撒阿达收到按时';
    let img = '';
    let time = Date.now();
    try{
      await blog.create({'title':title,'categoryId':categoryId,'content':content,'img':img,'time':time});
      ctx.response.body = 'success';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 查询订单
  queryOrder:async(ctx)=>{
    let id = ctx.query.id;
    try{
      const result = await alipaySdk.exec('alipay.trade.query',{
        appId: '2021001164691594',
        out_trade_no: id,
        alipayPublicKey:`-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhdP1Ukzab0gOeSb7knf/qyhG6CRMoRtQ6edxcjwdcLS05rwfe+DZtvi6NIMhvedxMMzh7yTouTHX/K16BxvaolAsRJNeuMfgAzUGKRFskKq5FAGeyv99Rmkb+lPLcQU8fKjaihkN/PuYazmSse1f5Yer+DPFhdyfeLhBjAdpsEUeqQtSpS9b5Q7aHYSybCcdU5vWn1g990mjYbSbGUznNAJoWtxHNOCdLQoGtBXvhcT1rCEpa/sq6Y/TbHlnCa5eH09b+WzTvFXovA2urtJA3k0QC5TzYtDuJ10svyD87SQopmi8uNnSm0g8gITh2kcPdcVe6vWYmczzBixivVbbZQIDAQAB
        -----END PUBLIC KEY-----`,
        bizContent:{
          out_trade_no: id,// 必填 商户订单主键, 就是你要生成的
        }
      });
      ctx.response.body = result;
    } catch(err) {
      console.log(err,'shibai');
    }
  }

};
