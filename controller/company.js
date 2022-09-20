
const company = require('../mongo/company');
const Axios = require('axios');

module.exports={
  companyList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let {isSend,haveWebsite,havePhone,haveEmail,emailValid,emailCheck} = ctx.request.body;

    let _isSend =isSend!==null? {isSend:{$eq:isSend}}:null;
    let _haveWebsite = haveWebsite!==null?{haveWebsite:{$eq:haveWebsite}}:null;
    let _havePhone = havePhone!==null?{havePhone:{$eq:havePhone}}:null;
    let _haveEmail = haveEmail!==null?{haveEmail:{$eq:haveEmail}}:null;
    let _emailValid = emailValid!==null?{emailValid:{$eq:emailValid}}:null;
    let _emailCheck = emailCheck!==null?{emailCheck:{$eq:emailCheck}}:null;
    let options =[_isSend,_haveWebsite,_havePhone,_haveEmail,_emailValid,_emailCheck];
    let filter = options.filter((item)=>{
      return item!==null;
    });
    if(!_isSend&&!_haveWebsite&&!_havePhone&&!_haveEmail&&!_emailValid&&!_emailCheck){
      total= await company.find({}).count();
      result = await company.find({}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      total= await company.find({$and:filter}).count();
      result = await company.find({$and:filter}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total,
      data:result
    };
  },
  // 添加公司
  addCompany:async(ctx)=>{
    let list = ctx.request.body;
    // list.forEach(obj=> {

    // });
    // console.log(ctx.request.body,666777888);
    // let {
    //   companyName,
    //   operatingStatus,
    //   legalPerson,
    //   registeredCapital,
    //   paidInCapital,
    //   dateOfIncorporation,
    //   approvalDate,
    //   businessTerm,
    //   province,
    //   city,
    //   county,
    //   unifiedSocialCreditCode,
    //   TINumber,
    //   registrationNumber,
    //   organizationCode,
    //   numberOfInsured,
    //   companyType,
    //   industry,
    //   NameUsedBefore,
    //   registeredAddress,
    //   newAddress,
    //   website,
    //   phone,
    //   otherPhone,
    //   email,
    //   otherEmail,
    //   natureOfBusiness,
    //   remark,
    //   sendNum
    // } = ctx.request.body[0]
    // console.log(companyName,999988877);
    try{
      async function getAll(){
        return new Promise(async(resolve,reject)=>{
          for([index,item] of list.entries()) {
            let result = await company.find({ 'companyName': item.companyName });
            if(result.length ===0) {

              await company.create(item);
              if(index ==57) {
                resolve();
              }
              console.log(index,888999);
            }
          }
        });
      }
      await getAll();
      // let p =  new Promise((resolve, reject) => {
      //     setTimeout(()=>{
      //       resolve()
      //     },3000)
      // })
      // await p


      // let p = new Promise(async (resolve,reject)=>{
      //   for([index,item] of list.entries()) {
      //     let result = await company.find({ 'companyName': item.companyName });
      //     if(result.length ===0) {
      //       await company.create(item);
      //     }
      //   }
      // })
      // await p;
      ctx.response.body = '成功添加公司';
    } catch(err) {
      console.log(err,1234);
      ctx.body = '出错';
    }
  },
  // 删除公司
  delCompany:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await company.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 公司详情
  companyView:async(ctx)=>{
    let id = ctx.query.id;
    if(!id) {
      ctx.response.body = '没有Id';
      return;
    }
    let conditions = { '_id': id };
    let result = await company.find(conditions);
    ctx.response.body = result;
  },
   // 修改公司信息
  updateCompany:async(ctx)=>{
    let {
      companyName,
      operatingStatus,
      legalPerson,
      registeredCapital,
      paidInCapital,
      dateOfIncorporation,
      approvalDate,
      businessTerm,
      province,
      city,
      county,
      unifiedSocialCreditCode,
      TINumber,
      registrationNumber,
      organizationCode,
      numberOfInsured,
      companyType,
      industry,
      NameUsedBefore,
      registeredAddress,
      newAddress,
      website,
      phone,
      otherPhone,
      email,
      otherEmail,
      natureOfBusiness,
      remark,
      sendNum,
      sendContent, //发送内容
      clickWebsite, //是否点击过网站
      haveWebsite,
      havePhone,
      haveEmail,
      isSend
    } = ctx.request.body;
    let id = ctx.request.body.id || '';

    var conditions = {'_id' : id};
    var update = {$set : { companyName,
      operatingStatus,
      legalPerson,
      registeredCapital,
      paidInCapital,
      dateOfIncorporation,
      approvalDate,
      businessTerm,
      province,
      city,
      county,
      unifiedSocialCreditCode,
      TINumber,
      registrationNumber,
      organizationCode,
      numberOfInsured,
      companyType,
      industry,
      NameUsedBefore,
      registeredAddress,
      newAddress,
      website,
      phone,
      otherPhone,
      email,
      otherEmail,
      natureOfBusiness,
      remark,
      sendNum,
      sendContent,
      clickWebsite,
      isSend:sendNum>0?true:false,
      haveWebsite:website.length>1?true:false,
      havePhone:phone.length>1?true:false,
      haveEmail:email.length>1?true:false,
    }};
    try{
      await company.updateOne(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 批量更新
  vertifyEmailBatch:async(ctx)=>{

    let companyNames = ctx.request.body;
    try{
      let count = await company.find({companyName:{$in:companyNames}});
      await company.updateMany({companyName:{$in:companyNames}},{$set: {'emailCheck':true}});
      ctx.response.body = '批量设置成功';
    } catch(e) {
      ctx.response.body = '批量设置失败';
    }
  },
  // 更新
  updateSwitch:async(ctx)=>{
    let id = ctx.request.body.id || '';
    console.log(ctx.request.body,67667);
    let emailValid = ctx.request.body.emailValid;
    var conditions = {'_id' : id};
    var update = {$set : { 'emailValid' : emailValid}};
    try{
      console.log(conditions, update);
      await company.updateOne(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 邮箱侦探验证邮箱
  vertifyEmailByDetective:async(ctx)=>{
    let emailList = ctx.request.body;
    console.log(emailList,1234);
    ctx.response.body='编辑出错';
    emailList.forEach((item,index) => {
      Axios.get(
        `https://api.mail-verifier.xyz/?cmd=verify&key=8680244EB6827DFE5A11F7A1A0BCF9DA&email=${item.email}`
      ).then(async result => {
        console.log(result.data,888889999);
        if(result.data.code===1) {
          await company.updateOne({'_id' : item.id}, {$set : { 'emailValid' : true,'remark':result.data.msg,'emailCheck':true}});
        } else {
          await company.updateOne({'_id' : item.id}, {$set : { 'emailValid' : false,'remark':result.data.msg,'emailCheck':true}});
        }
      });
    });
  }
};


// db.getCollection("company").find({companyName:'厦门普华天元咨询管理有限公司'},{}) //获取公司名称为厦门普华天元咨询管理有限公司
// db.getCollection("company").find({sendNum:{$eq:10}},{})   // 获取==10
// db.getCollection("company").find({sendNum:{$in:[10,15]}},{})  // 获取 10,15
// db.getCollection("company").distinct("companyName")   //获取公司名称集合  并去重

// db.getCollection("company").find({companyName:{$exists:true}})   //$exists 查询某字段是否为空的数据
// 查询sendnum ===10 或者otherphone ==13686888777
// db.getCollection("company").find({$or:[{sendNum:{$eq:10}},{otherPhone:{$eq:'13686888777'}}]})

// 查询sendnum ===10 并且otherphone ==15396276106
// db.getCollection("company").find({$and:[{sendNum:{$eq:10}},{otherPhone:{$eq:'15396276106'}}]})
// 查找大于2019 小于2018的值
// Model.find({ year: { $gt: 2019, $lt: 2018 } });

//  Model.find({email:{$regex:eval(`/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/`)}})

// sort	排序
// skip	跳过
// limit	限制
// select	显示字段
// exect	执行
// count	计数
// distinct	去重
