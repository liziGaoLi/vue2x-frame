const AMS = require('gl-ajax-mock');

// 整体数据使用/授权
const totalData = async (ctx, util) => {
  const result = AMS.mock({
    sqzs: '@integer(1000, 5000)',
    syzs: '@integer(1000, 5000)'
  })
  ctx.body = util.succ(result);
}

// 今日数据使用/授权
const todayData = async (ctx, util) => {
  const result = AMS.mock({
    sqjr: '@integer(1000, 5000)',
    syjr: '@integer(1000, 5000)'
  })
  ctx.body = util.succ(result);
}

// 近七日数据授权情况
const sevenDayDataEmpower = async (ctx, util) => {
  ctx.body = util.succ({
    chart: [
      { date: 1604663401666, value: 183 },
      { date: 1604763401666, value: 332 },
      { date: 1604863401666, value: 283 },
      { date: 1604963401666, value: 403 },
      { date: 1605063401666, value: 303 },
      { date: 1605063401666, value: 130 },
      { date: 1605151857243, value: 135 },
    ],
    total: '5423',
  });
}

// 近七日数据使用情况
const sevenDayDataUse = async (ctx, util) => {
  ctx.body = util.succ({
    chart: [
      { date: 1604663401666, value: 183 },
      { date: 1604763401666, value: 332 },
      { date: 1604863401666, value: 283 },
      { date: 1604963401666, value: 403 },
      { date: 1605063401666, value: 303 },
      { date: 1605063401666, value: 130 },
      { date: 1605151857243, value: 135 },
    ],
    total: '8423',
  });
}

// 今年数据授权情况
const thisYearDataEmpower = async (ctx, util) => {
  ctx.body = util.succ([
    { month: 1, value: 1.5 },
    { month: 2, value: 3 },
    { month: 3, value: 2.3 },
    { month: 4, value: 4.3 },
    { month: 5, value: 3.3 },
    { month: 6, value: 1.3 },
    { month: 7, value: 1.3 },
    { month: 8, value: 4.3 },
    { month: 9, value: 1.84 },
    { month: 10, value: 2.2 },
    { month: 11, value: 2.9 },
    { month: 12, value: 1 },
  ]);
}

// 今年数据使用情况
const thisYearDataUse = async (ctx, util) => {
  ctx.body = util.succ([
    { month: 1, value: 1.3 },
    { month: 2, value: 3.32 },
    { month: 3, value: 2.3 },
    { month: 4, value: 4.3 },
    { month: 5, value: 3.3 },
    { month: 6, value: 1.3 },
    { month: 7, value: 1.3 },
    { month: 8, value: 4.3 },
    { month: 9, value: 1.84 },
    { month: 10, value: 2.2 },
    { month: 11, value: 0.9 },
    { month: 12, value: 2.9 },
  ]);
}

// 今日数据授权人员信息
const dataEmpowerPersonnel = async (ctx, util) => {
  const list = AMS.mock('5-20', {
    name: '@cname',
    idCard: '@id',
    usageTime: '8:00'
  });
  ctx.body = util.succ(list);
}

// 今日数据使用人员信息
const dataUsePersonnel = async (ctx, util) => {
  const list = AMS.mock('5-10', {
    name: '@cname',
    company: '@ctitle',
    usageTime: '8:00'
  });
  ctx.body = util.succ(list);
}

module.exports = {
  totalData,
  todayData,
  sevenDayDataEmpower,
  sevenDayDataUse,
  thisYearDataEmpower,
  thisYearDataUse,
  dataEmpowerPersonnel,
  dataUsePersonnel
}