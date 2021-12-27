const AMS = require('gl-ajax-mock');

const LIST_DATA = AMS.mock('100-500', {
  authcode: '@guid',
  authValidTerm: '60',
  authBeginTime: new Date().getTime(),
  orgCode: '@integer(10-1000)',
  orgName: '@ctitle',
  'authType|1': ['1', '2'],
  'orgType|1': ['01', '02'],
  'bussinessType|1': ['1', '2'],
  certnumber: '@integer(100000,9000000)',
  username: '@cname',
});

// 列表查询
const dataUsageList = async (ctx, util) => {
  const {pageSize, currentPage} = ctx.request.body;
  const len = LIST_DATA.length;
  const list = LIST_DATA.slice(pageSize * (currentPage - 1), pageSize * currentPage);
  ctx.body = util.succ({
    pageSize,
    currentPage,
    total: len,
    rows: list
  })
}

module.exports = {
  dataUsageList
}