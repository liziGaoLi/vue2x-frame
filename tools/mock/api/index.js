const login = require('./user/login');
// 数据总览接口
const { todayData, totalData, sevenDayDataUse, sevenDayDataEmpower, thisYearDataUse, thisYearDataEmpower, dataEmpowerPersonnel, dataUsePersonnel } = require('./dataOverview');
// 字典数据
const dicOptions = require('./dicOptions');
// 数据使用列表页面
const { dataUsageList } = require('./dataUsageList');
// 数据使用列表详情页面
const { queryServiceList, dataUsageDetail } = require('./dataUsageView');
// 机构管理
const { queryOrgList, changeOrgRunStatus, deleteOrg, checkOrgInfo, modifyOrgInfo, addOrgInfo } = require('./orgManage');


module.exports = [
  {
    // 登录
    url: 'POST login',
    func: login
  },
  // 数据总览-start
  // 总体数据授权、使用情况
  { url: 'POST dataOverview/totalData', func: totalData },
  // 当日数据授权、使用情况
  { url: 'POST dataOverview/todayData', func: todayData },
  // 近七日数据授权情况
  { url: 'POST dataOverview/sevenDayDataEmpower', func: sevenDayDataEmpower },
  // 近七日数据使用情况
  { url: 'POST dataOverview/sevenDayDataUse', func: sevenDayDataUse },
  // 今年数据授权情况
  { url: 'POST dataOverview/thisYearDataEmpower', func: thisYearDataEmpower },
  // 今年数据使用情况
  { url: 'POST dataOverview/thisYearDataUse', func: thisYearDataUse },
  // 当日数据授权人员
  { url: 'POST dataOverview/dataEmpowerPersonnel', func: dataEmpowerPersonnel},
  // 当日数据使用人员
  { url: 'POST dataOverview/dataUsePersonnel', func: dataUsePersonnel},
  // 数据总览-end
  // 字典数据
  { url: 'GET system/dict/data/list', func: dicOptions },
  // 数据使用列表查询
  { url: 'POST searchStatistics/dataUsageList', func: dataUsageList},
  // 服务信息列表查询
  { url: 'POST searchStatistics/serviceList', func: queryServiceList },
  // 数据使用详情
  { url: 'POST searchStatistics/dataUsageDetail', func: dataUsageDetail },
  // 机构列表
  { url: 'POST chargeCenter/orgList', func: queryOrgList},
  // 改变机构运行状态
  { url: 'POST chargeCenter/changeOrgRunStatus', func: changeOrgRunStatus},
  // 删除机构
  { url: 'POST chargeCenter/deleteOrg', func: deleteOrg },
  // 查看机构信息
  { url: 'POST chargeCenter/checkOrgInfo', func: checkOrgInfo },
  // 修改机构信息
  { url: 'POST chargeCenter/modifyOrgInfo', func: modifyOrgInfo },
  // 增加机构
  { url: 'POST chargeCenter/addOrgInfo', func: addOrgInfo},
]