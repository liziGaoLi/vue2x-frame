import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home'
import Login from '../pages/Login';
import DataUsageList from '../pages/DataUsageList';
import DataUsageView from '../pages/DataUsageView';
import OrgManage from '../pages/OrgManage';
import OrgInfo from '../pages/OrgInfo';

Vue.use(VueRouter);

const routes = [
  // 首页
  {path: '/home', component: Home},
  // 数据使用列表
  {path: '/searchStatistics/usageDetailQuery', component: DataUsageList},
  {path: '/searchStatistics/usageDetail/:authcode', component: DataUsageView},
  {path: '/chargeCenter/organizationCharge', component: OrgManage},
  {path: '/chargeCenter/orgInfo/:operate/:orgCode', component: OrgInfo},
  {path: '/login', component: Login},
  {path: '/', redirect: '/home'}
];

const router = new VueRouter({
  mode: 'history',
  base: '/bdsp',
  routes
})

export default router;