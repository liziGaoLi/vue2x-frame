const AMS = require('gl-ajax-mock');

// 服务信息列表
const serviceList = AMS.mock('50-200', {
  serviceCode: '@guid()',
  serviceName: '@ctitle', // 服务名称
  businessType: '1', //用途
  effectiveDate: '@date', // 有效期
  expireDate: '@date',
  'contractStatus|1': ['00', '01'], // 状态
});

// 服务信息列表查询
const queryServiceList = async (ctx, util) => {
  const { pageSize, currentPage } = ctx.request.body;
  ctx.body = util.succ({
    pageSize,
    currentPage,
    total: serviceList.length,
    rows: serviceList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  });
}

// 数据使用详情：机构信息、经办人信息、操作记录
const dataUsageDetail = async (ctx, util) => {
  const SINGLE_DATA = AMS.mock({
    authValidTerm: '1',
    authBeginTime: '2020-11-24 10:10:10',
    businessType: '1',
    username: '@cname',
    certNumber: '231025199206083456',
    authType: '1',
    useTime: ['2020-11-25 10:10:10'],
    orgName: '@ctitle',
    orgShortName: '@ctitle',
    orgAddress: '@county(true)',
    'orgType|1': ['01', '02'],
    'runStatus|1': ['0', '1'],
    handlerName: '@cname',
    handlerIdCard: '@id',
    'handlerTel|11': '9'
  });

  ctx.body = util.succ({
    rows: SINGLE_DATA,
  });
}

module.exports = {
  // 服务信息列表查询
  queryServiceList,
  // 数据使用详情：机构信息、经办人信息、操作记录
  dataUsageDetail
}