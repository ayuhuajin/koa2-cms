const order = require('../mongo/order');

module.exports={
  //订单列表
  orderList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let orderId =ctx.query.orderId||'';
    let status =ctx.query.status||'';
    let date =ctx.query.date||'';
    console.log(orderId);
    let name = ctx.query.name;
    if(!name && !orderId&&!status&&!date) {
      total = await order.find({});
      result = await order.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryOrderId= new RegExp(orderId, 'i');//模糊查询参数
      var queryStatus= new RegExp(status, 'i');//模糊查询参数
     // var queryDate= new RegExp(date, 'i');//模糊查询参数
      total = await order.find({$or:[{'shopName': queryName}],'orderId':queryOrderId,'status':queryStatus,});
      result = await order.find({$or:[{'shopName': queryName}],'orderId':queryOrderId,'status':queryStatus}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
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

  // 查询订单
  queryOrderById:async(ctx)=>{
    let orderId = ctx.query.orderId;
    let conditions = { 'orderId': orderId };
    let result = await order.find(conditions);
    ctx.response.body = result;
  },
};
