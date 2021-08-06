const order = require('../mongo/order');

module.exports={
  //订单列表
  orderList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await order.find({});
      result = await order.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await order.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await order.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加订单
  addOrder:async(ctx)=>{
    let shopName = ctx.request.body.shopName||'';
    let content = ctx.request.body.content||'';
    let time = Date.now();
    try{
      await order.create({'shopName':shopName,'content':content,'time':time});
      ctx.response.body = '成功添加订单123413';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除订单
  delOrder:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await order.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
};
