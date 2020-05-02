const question = require('../mongo/question.js');

module.exports={
  //试题列表
  questionList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await question.find({});
      result = await question.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await question.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await question.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加工具
  addQuestion:async(ctx)=>{
    let title = ctx.request.body.title||'';
    let categoryId = ctx.request.body.categoryId||'';
    let desc = ctx.request.body.desc||'';
    let link = ctx.request.body.link||'';
    let img = ctx.request.body.img||'';
    let time = Date.now();
    try{
      await question.create({'title':title,'categoryId':categoryId,'desc':desc,'link':link,'img':img,'time':time});
      ctx.response.body = '成功博客添加';
    } catch(err) {
      ctx.body = '出错';
    }
  },
};
