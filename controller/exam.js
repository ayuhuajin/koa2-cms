const exam = require('../mongo/exam.js');

module.exports={
  //试卷列表
  examList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await exam.find({});
      result = await exam.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await exam.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await exam.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加试卷
  addExam:async(ctx)=>{
    let title = ctx.request.body.title||'';
    let subject = ctx.request.body.subject||'';
    let level = ctx.request.body.level||'';
    let img = ctx.request.body.img||'';
    let time = Date.now();
    try{
      await exam.create({'title':title,'subject':subject,'level':level,'img':img,'time':time});
      ctx.response.body = '成功添加试卷';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除博客
  delExam:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await exam.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
   // 修改博客
   updateExam:async(ctx)=>{
    let id = ctx.request.body.id || '';
    let title = ctx.request.body.title||'';
    let subject = ctx.request.body.subject||'';
    let level = ctx.request.body.level||'';
    let img = ctx.request.body.img||'';
    var conditions = {'_id' : id};
    var update = {$set : { 'title' : title,'subject' : subject,'level' : level,'img' : img,}};
    try{
      await exam.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 博客视图
  examView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await exam.find(conditions);
    ctx.response.body = result;
  },
};
