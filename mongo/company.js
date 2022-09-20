const mongoose = require('mongoose');

let companyScheme = new mongoose.Schema({
  companyName:String, // 公司名称
  operatingStatus:String, //经营状态
  legalPerson:String,  // 法人
  registeredCapital:String,  //注册资本
  paidInCapital: String, // 实缴资本
  dateOfIncorporation:String, //成立日期
  approvalDate:String, //核准日期
  businessTerm:String, //营业期限
  province:String, //所属省份
  city:String, //所属城市
  county:String, //所属区县
  unifiedSocialCreditCode:String, //统一社会信用代码
  TINumber:String, //纳税人识别号
  registrationNumber:String, //注册号
  organizationCode:String, //组织机构代码
  numberOfInsured:String, //参保人数
  companyType:String, //公司类型
  industry:String, //所属行业
  NameUsedBefore:String, //曾用名
  registeredAddress:String, //注册地址
  newAddress:String, //最新年报地址
  website:String, //网址
  phone:String, //电话
  otherPhone:String, //其他电话
  email:String, //邮箱
  otherEmail:String, //其他邮箱
  natureOfBusiness:String, //经营范围
  remark:String, //备注
  sendContent:String, //发送内容
  clickWebsite:Boolean, //是否点击过网站
  sendNum:Number, //发送次数
  haveWebsite:Boolean,
  havePhone:Boolean,
  haveEmail:Boolean,
  isSend:Boolean,
  emailValid:Boolean,
  emailCheck:Boolean
});

let company = mongoose.model('company',companyScheme,'company');

module.exports = company;
