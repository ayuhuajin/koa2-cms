const tools = require('../mongo/tools');

module.exports={
  //工具列表
  toolList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await tools.find({});
      result = await tools.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await tools.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await tools.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加工具
  addTool:async(ctx)=>{
    let title = ctx.request.body.title||'';
    let categoryId = ctx.request.body.categoryId||'';
    let desc = ctx.request.body.desc||'';
    let link = ctx.request.body.link||'';
    let img = ctx.request.body.img||'';
    let time = Date.now();
    try{
      await tools.create({'title':title,'categoryId':categoryId,'desc':desc,'link':link,'img':img,'time':time});
      ctx.response.body = '成功添加工具';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除工具
  delTool:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await tools.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 修改工具
  updateTool:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let title = ctx.request.body.title||'';
    let categoryId = ctx.request.body.categoryId||'';
    let desc = ctx.request.body.desc||'';
    let link = ctx.request.body.link||'';
    let img = ctx.request.body.img||'';
    var conditions = {'_id' : id};
    var update = {$set : { 'title' : title,'categoryId' : categoryId,'desc' : desc,'link' : link,'img' : img}};
    try{
      await tools.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 工具视图
  toolView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await tools.find(conditions);
    ctx.response.body = result;
  }
};
