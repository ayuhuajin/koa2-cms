const shop = require('../mongo/shop');
const md5 = require('md5');


module.exports={
  //商品列表
  shopList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await shop.find({});
      result = await shop.find({},{shopSecret:0}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await shop.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await shop.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  getshopList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await shop.find({});
      result = await shop.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await shop.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await shop.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加商品
  addShop:async(ctx)=>{
    let shopName = ctx.request.body.shopName||'';
    let shopSecret = ctx.request.body.shopSecret||'';
    let content = ctx.request.body.content||'';
    let img = ctx.request.body.img||'';
    let time = Date.now();
    let secret = md5(123 + shopSecret + 123);
    try{
      await shop.create({'shopName':shopName,'content':content,shopSecret:shopSecret,secret:secret,'img':img,'time':time});
      ctx.response.body = '成功添加商品';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除商品
  delShop:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await shop.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 修改商品
  updateShop:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let shopName = ctx.request.body.shopName||'';
    let content = ctx.request.body.content||'';
    let shopSecret = ctx.request.body.shopSecret||'';
    let img = ctx.request.body.img||'';
    var conditions = {'_id' : id};
    let secret = md5(123 + shopSecret + 123);  //对商品密钥进行加密
    var update = {$set : { 'shopName' : shopName,shopSecret:shopSecret,secret:secret,'content' : content,'img' : img,}};
    try{
      await shop.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 商品视图
  shopView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await shop.find(conditions);
    ctx.response.body = result;
  },
  // 商品视图
  getshopView:async(ctx)=>{
    let id = ctx.query.id;
    let secret = ctx.query.secret;
    let conditions = { '_id': id };
    let result = await shop.find(conditions,{shopSecret:0});
    console.log(result,999999,secret);
    if(secret==result[0].secret) {
      ctx.response.body = result;
    } else {
      ctx.response.body = '密钥出错';
    }
  }
};
