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
  // 添加试题
  addQuestion:async(ctx)=>{
    console.log(ctx.request.body.options,89898);
    let questionNum = ctx.request.body.questionNum||'';
    let questionType = ctx.request.body.questionType||'';
    let questionTitle = ctx.request.body.questionTitle||'';
    let level = ctx.request.body.level||'';
    let subject = ctx.request.body.subject||'';
    let type = ctx.request.body.type||'';
    let testPaper = ctx.request.body.testPaper||'';
    let questionDesc = ctx.request.body.questionDesc||'';
    let options = ctx.request.body.options||'';
    let answer = ctx.request.body.answer||'';
    let time = Date.now();
    try{
      await question.create({'questionNum':questionNum,'questionType':questionType,'questionTitle':questionTitle,'level':level,'subject':subject,'type':type,'testPaper':testPaper,'questionDesc':questionDesc,'time':time,'options':options,'answer':answer});
      ctx.response.body = '成功添加试题';
    } catch(err) {
      ctx.body = '添加出错';
    }
  },
  // 删除试题
  delQuestion:async(ctx)=>{
    let id = ctx.request.body.id;
    try{
      await question.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 修改博客
  updateQuestion:async(ctx)=>{
    let id = ctx.request.body._id || '';
    let questionNum = ctx.request.body.questionNum||'';
    let questionType = ctx.request.body.questionType||'';
    let questionTitle = ctx.request.body.questionTitle||'';
    let level = ctx.request.body.level||'';
    let subject = ctx.request.body.subject||'';
    let type = ctx.request.body.type||'';
    let testPaper = ctx.request.body.testPaper||'';
    let questionDesc = ctx.request.body.questionDesc||'';
    let options = ctx.request.body.options||'';
    let answer = ctx.request.body.answer||'';
    let time = Date.now();
    var conditions = {'_id' : id};
    var update = {$set : {'questionNum':questionNum,'questionType':questionType,'questionTitle':questionTitle,'level':level,'subject':subject,'type':type,'testPaper':testPaper,'questionDesc':questionDesc,'time':time,'options':options,'answer':answer}};
    try{
      await question.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
  // 博客视图
  questionView:async(ctx)=>{
    let id = ctx.query.id;
    let conditions = { '_id': id };
    let result = await question.find(conditions);
    ctx.response.body = result;
  },
  //试卷详情（试卷试题）
  examDetail:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let testPaper = ctx.query.examId||'';
    total = await question.find({'testPaper': testPaper});
    result = await question.find({'testPaper': testPaper}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
};
