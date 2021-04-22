// const Axios = require('axios');
const blog = require('../mongo/blog');
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;
// const fs = require('fs');
const alipaySdk = new AlipaySdk({
  appId: '2016102400749295',
  gateway: 'https://openapi.alipaydev.com/gateway.do',
  // privateKey: fs.readFileSync('../config/private-key.pem', 'ascii'),
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEoQIBAAKCAQEAs33ngvlX9xYvKuqq9gTj658CNFF/ydwhdrzb0UlA/3DFq6PBei3I0GGmLYeYTQM9JoCG1cT8LCQ0J1iOlUpspCA4LOBMY1hMWXzn0wF7FaVwneL9Ko3x6rxRA8m/i3yZYVpPgHX0luWSQLkwgAl/frPTCilL3fl+73EaylyCCXzPNfkeOJoj1YbRVPpwBhORPpPeDHVMRo/nz++QgP3OsWHrQOI/fMSjULzI+saGfXhcreuP2DOl2VBDvLHuZgxfdRT5ndr94JNxQeLHIII5tTrr/eBCgv8t31QpPcUfvK8XoctycYKQ/63tcY3l7LfbF1mMEjSRMLQk+tSl0Gwn0QIDAQABAoIBAGkmdA71dcPpeh5hNWBEwyUQlOEDcaJW1D/UKc50ZKCAdzyzBTBHTCJPYmO/0MglApjgqJzo9nYBi5AVQApTfEu2GFKp3/Y/DxNJqiGh93JZ5hyIkplwaG2Efs2CTjUv/Ebc+kAeWfhgawqBstj/N3KJdDO6t5hFhkhNcU1lXkShnI2alen3wyq9InYbYoNoJbIKU2MTsIB/UwaDDXUH6MuOQOGl0ngtvcXHeupzYKDkm0EOl8YVMaNF11GiJ2xo+yOPK+lJ5lXdTLCDb8EWws5TPDUeu9pQu11iHdcCpr66fV8uwWLMTRPmZV3OORfum1csBHRe+RvXfdD8VClciHECgYEA9+cQ+/0GiEbPdy9nIOf/e2NkNyVcvZTaO56osOGG86kTOWmVHCfMe/vwhcD3P2wWoNg8Twjpkvmsz23DJnHAqY/e9WPdmVeHDbW6tC2pd+X0oO8Xc6WvvU/FmozlXQlPGX5Ts7VuL6RjqgWVxe3YuQuAWchm2COazM9fqJg9QU0CgYEAuVrLcDkm0fvruGi1bKoNiyLmKZINoa0oGnQkUGjaFN3W3rQEUToYrFhpA2Gdb0X/GEKtxiZHXJxPSB37DLJGO4eJ3KtpaILPR9tllVy6r4TjLaFI6xNzGgYzswevxf+uPw8px8eA97PiEbs59t33tYBVfP4ey2AwrXgCjdCGvpUCfwe/MMivH4UisVkIIjDlDxbMBFW01TEXdbpnOt5MLetvXSpuIjq/A6TcOqfzX8abmhlsqHXP0XzGUKAqze5ln5+s30rL1CD2m0HSbAM1ahZVGU/uKM10YAmKdKJfxMsjf1VMnVEAWnEisfqeMg/9Xshpk5k6qfwXIL9Fu7eJCmECgYAJmKLJt5vD6VgF3x3td0xmNLNX2aDtCur1m6e5pgQMaoPSWd2TWv+mBJnDPA2LkkMnvWQDyz2MlOch47N4r84lDNpdW16Es6kJnlk/B2L+7VFZrmz5BrPB2CpbDX3TMW6TAzT1i+WobV657kiM+Gb3taI3a2yquNssT/dJ4k7nlQKBgQDMbnoc1KCb520DLQ90n4yfU6WhKpLBGsAvVoD8w6Hgsl+I9CFGdzvsaz/Okd22rw8U094SCwRLSgQLoQkJ4c3T79VLBtUSzEFiUbuYqpTvbAaCwbNTI3dAbb77kJOFa/sL111fr2X8ncSgcbG2EiNFi4F6Hz44VOqNcAx5oGbjSA==
  -----END RSA PRIVATE KEY-----`,
  signType:'RSA2',
  alipayPublicKey:`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQsBcDJY3F0v/C7m5BXRREhrJgOvDNOlu7xY0+iFAPdxQtPebDTDGQYimiVXoCvOWyKZfoHEgBiAeUxq1GWphobID4EkkIo+Bv8XELmp1bdHZxQG+M0j+kgmW9KuJ/yAJM97B5ykSKzmdr90U9c8fGx1t0D9Dl2pT0SjPcqUb875qdcA9s5m+GRpHNFQ8WOmmBY+YoEiAM+S95V9rsAu6VFyNtY0ni/E5KCEAcApJPAy5oB1BF6vEqKElkyAvFoy6MSL5YE4Sal/M9x9AbS+9FBkK5oUaIpwkbdG412AaQnJjfuPN7I9t0cVLMYWU9YWimEzkTgD/8u8nuKM3WSeNwIDAQAB
  -----END PUBLIC KEY-----`,
});
const formData = new AlipayFormData();
formData.setMethod('post');


console.log(formData)



module.exports = {
  createOrder:async(ctx)=>{
    let {out_trade_no,subject,total_amount} = ctx.request.body;
    console.log(4446556,out_trade_no,subject,total_amount);
    formData.addField('bizContent', {
      outTradeNo: out_trade_no, // 订单号
      productCode: 'QUICK_WAP_WAY',
      totalAmount: '0.01',
      subject: 'biaoti标题',
      body: 'miaoshu描述',
    });
    // formData.bizContent.outTradeNo = out_trade_no
    // formData.bizContent.out_trade_no = out_trade_no
    // formData.bizContent.totalAmount = total_amount
    try{
      // alipay.trade.wap.pay
      console.log(formData,888);
      
      const result = await alipaySdk.exec('alipay.trade.wap.pay', {}, {
        formData: formData
      }, { validateSign: true });
      // console.log(result,8889999);
      
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
