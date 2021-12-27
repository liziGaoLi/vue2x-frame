export default {
  login: 'POST login',
  // 数据总览-start
  // 总体数据授权、使用情况
  totalData: 'POST dataOverview/totalData',
  // 当日数据授权、使用情况
  todayData: 'POST dataOverview/todayData',
  // 近七日数据授权情况
  sevenDayDataEmpower: 'POST dataOverview/sevenDayDataEmpower',
  // 近七日数据使用情况
  sevenDayDataUse: 'POST dataOverview/sevenDayDataUse',
  // 今年数据授权情况
  thisYearDataEmpower: 'POST dataOverview/thisYearDataEmpower',
  // 今年数据使用情况
  thisYearDataUse: 'POST dataOverview/thisYearDataUse',
  // 当日数据授权人员
  dataEmpowerPersonnel: 'POST dataOverview/dataEmpowerPersonnel',
  // 当日数据使用人员
  dataUsePersonnel: 'POST dataOverview/dataUsePersonnel',
  // 数据总览-end

  // 数据使用列表页面
  dataUsageList: 'POST searchStatistics/dataUsageList',
  // 服务信息列表查询
  serviceList: 'POST searchStatistics/serviceList',
  // 数据使用详情：机构信息、经办人信息、操作记录
  dataUsageDetail: 'POST searchStatistics/dataUsageDetail',
  // 机构管理
  orgList: 'POST chargeCenter/orgList',
  // 更改机构运行状态
  changeOrgRunStatus: 'POST chargeCenter/changeOrgRunStatus',
  // 删除机构
  deleteOrg: 'POST chargeCenter/deleteOrg',
  // 查看机构
  checkOrgInfo: 'POST chargeCenter/checkOrgInfo',
  // 修改机构
  modifyOrgInfo: 'POST chargeCenter/modifyOrgInfo',
  // 添加机构
  addOrgInfo: 'POST chargeCenter/addOrgInfo',
  // 字典数据接口-start
  // 证件类型
  certType: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_bdsp_certtype' },
  },
  // 授权状态
  authStatus: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_bdsp_authstatus' },
  },
  // 授权方式
  authType: {
    url: ' system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_bdsp_authtype' },
  },
  // 授权用途
  authUses: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_bdsp_auth_uses' },
  },
  // 核身类型
  verityType: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_bdsp_verity_type' },
  },
  // 机构类型
  orgType: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_org_type' },
  },
  // 机构运行状态
  runStatus: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_org_status' },
  },
  // 应用状态
  appStatus: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'dc_app_status' },
  },
  // 机构详情-服务信息列表状态
  contactStatus: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'mc_contract_status' },
  },
  // 机构审批状态
  approvalStatus: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_org_approvalstatus' },
  },
  // 城市编码
  cityCode: {
    url: 'system/dict/data/list',
    method: 'GET',
    key: { dictType: 'sys_org_citycode' },
  },
  // 字典数据接口-end
}
