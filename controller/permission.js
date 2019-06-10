const permission = require('../mongo/permission.js');
module.exports={
  // 权限列表
  permissionList:async(ctx)=>{
    let result = await permission.find({});
    ctx.response.body = {
      data:result
    };
  },
  // 添加权限
  addPermission: async (ctx) => {
    let permissionId = ctx.request.body.permissionId || '';
    let permissionName = ctx.request.body.permissionName || '';
    let path = ctx.request.body.path || '';
    try{
      await permission.create({ 'permissionId': permissionId, 'permissionName':permissionName,'path':path});
      ctx.response.body = '添加权限';
    }catch(err){
      ctx.body = '出错';
    }
  },
};
