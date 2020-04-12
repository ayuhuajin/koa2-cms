const tools = require('../mongo/tools');

module.exports={
  //博客列表
  blogList:async(ctx)=>{
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
  getBlogList:async(ctx)=>{
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
  // 添加博客
  addBlog:async(ctx)=>{
    let title = ctx.request.body.title||'';
    let categoryId = ctx.request.body.categoryId||'';
    let content = ctx.request.body.content||'';
    let img = ctx.request.body.img||'';
    let time = Date.now();
    try{
      await tools.create({'title':title,'categoryId':categoryId,'content':content,'img':img,'time':time});
      ctx.response.body = '成功博客添加';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除博客
  delBlog:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await tools.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 修改博客
  updateBlog:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let title = ctx.request.body.title||'';
    let categoryId = ctx.request.body.categoryId||'';
    let content = ctx.request.body.content||'';
    let img = ctx.request.body.img||'';
    var conditions = {'_id' : id};
    var update = {$set : { 'title' : title,'categoryId' : categoryId,'content' : content,'img' : img,}};
    try{
      await tools.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 博客视图
  blogView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await tools.find(conditions);
    ctx.response.body = result;
  },
  // 博客视图
  getBlogView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await tools.find(conditions);
    ctx.response.body = result;
  }
};
