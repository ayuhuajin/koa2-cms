const exam = require('../mongo/exam.js');

module.exports={
  //试卷列表
  examList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let subject =ctx.query.subject||'';
    let title = ctx.query.title;
    if(!title && !subject) {
      total = await exam.find({});
      result = await exam.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(title, 'i');//模糊查询参数
      total = await exam.find({$or:[{'title': queryName}],'subject':subject});
      result = await exam.find({$or:[{'title': queryName}],'subject':subject}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
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
  // 删除试卷
  delExam:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await exam.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
   // 修改试卷
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
  // 试卷视图
  examView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await exam.find(conditions);
    ctx.response.body = result;
  },
};
