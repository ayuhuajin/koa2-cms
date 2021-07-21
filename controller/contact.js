const contact = require('../mongo/contact');

module.exports={
  //博客列表
  contactList:async(ctx)=>{
    let total,result;
    let limit =ctx.query.pageSize||10;
    let currentPage =ctx.query.pageNumber||1;
    let categoryId =ctx.query.categoryId||'';
    let name = ctx.query.name;
    if(!name && !categoryId) {
      total = await contact.find({});
      result = await contact.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await contact.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await contact.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
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
      total = await contact.find({});
      result = await contact.find({}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    } else {
      var queryName= new RegExp(name, 'i');//模糊查询参数
      var queryCategoryId= new RegExp(categoryId, 'i');//模糊查询参数
      total = await contact.find({$or:[{'title': queryName}],'categoryId':queryCategoryId});
      result = await contact.find({$or:[{'title': queryName}],'categoryId':queryCategoryId}).sort({'time':-1}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit));
    }
    ctx.response.body = {
      total:total.length,
      data:result
    };
  },
  // 添加联系人
  addContact:async(ctx)=>{
    let time = Date.now();
    let list = ctx.request.body|| [];
    try{
      list.forEach(async item => {
        await contact.create(
          {name:item.name,nickName:item.nickName,phone:item.phone,wechat:item.wechat,addr:item.addr,province:item.province,county:item.county,city:item.city,type:item.type,desc:item.desc,content:item.content,isAddContactWX:item.isAddContactWX,tiem:time}
        );
      });
      ctx.response.body = '成功添加联系人';
    } catch(err) {
      ctx.body = '出错';
    }
  },
  // 删除联系人
  delContact:async(ctx)=>{
    let id = ctx.request.body._id;
    try{
      await contact.deleteOne({'_id':id});
      ctx.response.body = '删除成功';
    } catch(e) {
      ctx.response.body = '删除失败';
    }
  },
  // 修改联系人
  updateContact:async(ctx)=>{
    let item = ctx.request.body;
    let id = ctx.request.body._id || '';
    // let title = ctx.request.body.title||'';
    // let categoryId = ctx.request.body.categoryId||'';
    // let content = ctx.request.body.content||'';
    // let img = ctx.request.body.img||'';
    var conditions = {'_id' : id};
    var update = {$set : {name:item.name,nickName:item.nickName,phone:item.phone,wechat:item.wechat,addr:item.addr,province:item.province,county:item.county,city:item.city,type:item.type,desc:item.desc,content:item.content,isAddContactWX:item.isAddContactWX}};
    try{
      await contact.update(conditions, update);
      ctx.response.body = '编辑成功';
    }catch(err){
      ctx.response.body='编辑出错';
    }
  },
};
