const company = require('../mongo/company');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  'host': 'smtpdm.aliyun.com', //SMTP服务地址
  'port': 80,
  //"secureConnection": true, // use SSL, the port is 465
  'auth': {
      'user': 'singhai@email.wulilang.com', // user name
      'pass': 'SSMMttpp1122'         // password
  }
});
var mailOptions = {
  from: 'singhai@email.wulilang.com', // sender address mailfrom must be same with the user
  to: '455493143@qq.com', // list of receivers
  replyTo:'xxxxx@xxxxx.com',//custom reply address
  subject: 'Hello', // Subject line
  text: 'Hello world', // plaintext body
  html:'<b>Hello world</b><img src="cid:01" style="width:200px;height:auto">', // html body
  attachments: [
  ],
};

module.exports={
  sendEmail:async(ctx)=>{
    let data = ctx.request.body;
    let id = data.companyId;
    mailOptions = data;
    var conditions = {'_id' : id};
    let result = await company.find(conditions);
    let sendNum = result[0].sendNum + 1;
    var update = {$set : {
      sendNum:sendNum,isSend:true
    }};
    function sendMessage(){
      return new Promise((resolve,reject)=>{
        // setTimeout(async ()=>{
        //   await company.updateOne(conditions, update);
        //   resolve({response:'成功了'})
        // },1000)
        transporter.sendMail(mailOptions, async function(error, info){
          if(error){
            await company.updateOne(conditions, {$set:{remark:error}});
            reject(error);
            // return ctx.response.body =error
          } else {
            await company.updateOne(conditions, update);
            console.log('Message sent: ' + info.response);
            resolve(info);
          }
        });
      });
    }
    try{
      let obj = await sendMessage(mailOptions);
      return ctx.response.body = obj.response;
    } catch(err){
      return ctx.response.body = err;
    }
  },
};
