const category = require('../mongo/category');
module.exports={
  // 分类列表
  categoryList:async(ctx)=>{
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNum||1;
    let name = ctx.query.name;
    let total;
    let result;
    if(!name) {
      total = await category.find({});
      result = await category.find({}).sort({'date':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var query= new RegExp(name, 'i');//模糊查询参数
      total = await category.find({$or:[{'name': query}]});
      result = await category.find({$or:[{'name': query}]}).sort({'date':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加分类
  addCategory: async (ctx) => {
    console.log(1111,ctx.request.body.name);
    let name = ctx.request.body.name || '';
    let author = ctx.request.body.age || '';
    let date = ctx.request.body.date || '';
    try{
      await category.create({ 'name': name, 'author':author,'date':date});
      ctx.response.body = 'success';
    }catch(err){
      ctx.body = '出错';
    }
    
  },
  // 删除分类
  delCategory:async(ctx)=>{
    let id = ctx.request.body.id;
    console.log(id);
    let conditions = { '_id': id };
    try{
      await category.deleteOne(conditions);
      ctx.response.body = 'Delete success';
    } catch(err){
      ctx.response.body = '出错';
    }
   
  },
  // 修改分类名称
  updateCateGory:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let name = ctx.request.body.name || '';
    var conditions = {'_id' : id};
    var update = {$set : { 'name' : name}};
    try{
      await category.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 根据Id 获取分类视图
  categoryView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await category.find(conditions);
    ctx.response.body = result;
  },
  // 根据名称获取列表
  categorySearch:async(ctx)=>{
    let name = ctx.query.name;
    var query= new RegExp(name, 'i');//模糊查询参数
    let result = await category.find({$or:[{'name': query}]});
    ctx.response.body = result;
  }
};
