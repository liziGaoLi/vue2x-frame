const ams = require('gl-ajax-mock');

const list = ams.mock('50-200', {
  createTime: '2020-11-24',
  approvalTime: '2020-11-24',
  params: {},
  pkey: '@guid',
  cityCode: '城市码1',
  orgCode: '@guid',
  orgName: '@ctitle',
  'orgType|1': ['01', '02'],
  creditCode: '社会统一码',
  orgSname: '简称',
  orgAddress: '@city(true)',
  orgContactName: '经办人姓名',
  orgContactCardNo: '经办人身份证号',
  orgContactTel: '经办人电话',
  orgContactCardPic: './icon.png',
  orgContactCardPicBack: './icon.png',
  orgBusinessLicensePic: './icon.png',
  'runStatus|1': ['0', '1', '2'],
  createUser: '@cname',
  approvalUser: '@cname',
})

// 机构列表查询
const queryOrgList = async (ctx, util) => {
  const { pageSize, currentPage } = ctx.request.body;
  await util.delay(1000);
  ctx.body = util.succ({
    pageSize,
    currentPage,
    total: list.length,
    rows: list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  });
}

// 更改机构运行状态
const changeOrgRunStatus = async (ctx, util) => {
  const { orgCode, runStatus } = ctx.request.body;
  console.log(orgCode, runStatus)
  list.find(item => item.orgCode === orgCode).runStatus = runStatus;
  ctx.body = util.succ();
}

// 删除机构
const deleteOrg = async (ctx, util) => {
  const { orgCode } = ctx.request.body;
  const index = list.findIndex(item => item.orgCode === orgCode);
  list.splice(index, 1);
  ctx.body = util.succ();
}

// 查看机构信息
const checkOrgInfo = async (ctx, util) => {
  const { orgCode } = ctx.request.body;
  const targetItem = list.find(item => item.orgCode === orgCode);
  ctx.body = util.succ({
    ...targetItem
  });
}

// 修改结构信息
const modifyOrgInfo = async (ctx, util) => {
  await util.delay(1000);
  const { orgCode } = ctx.request.body;
  const index = list.findIndex(item => item.orgCode === orgCode);
  list[index] = {
    ...list[index],
    ...ctx.request.body
  }
  ctx.body = util.succ({});
}

// 添加机构
const addOrgInfo = async (ctx, util) => {
  await util.delay(1000);
  ctx.body = util.succ({});
}


module.exports = {
  queryOrgList,
  changeOrgRunStatus,
  deleteOrg,
  checkOrgInfo,
  modifyOrgInfo,
  addOrgInfo
}