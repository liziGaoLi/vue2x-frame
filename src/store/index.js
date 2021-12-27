import Vue from 'vue';
import Vuex from 'vuex';
import { Base64 } from 'js-base64';
import mutations from './mutations';
import actions from './actions';
import getters from "./getters";
import menuData from '../common/config/menus';
import projectConfig from "../common/config/projectConfig";
import getMenuStatus from "../common/getMenuStatus";

const fixedTabs = projectConfig.home.map(item => {
  item.fixed = true;
  return item;
});

const fixedPages = {};
fixedTabs.forEach(item => {
  fixedPages[item.id] = {};
})

Vue.use(Vuex);



let state = {
  // 页签数据
  tabs: [
    ...fixedTabs
  ],
  // 当前页签
  currentTabId: projectConfig.home[0].id,
  // 主菜单
  menuData: menuData || [],
  // 菜单栏状态
  // isCollapsed: true, 是否折叠
  // type: '', 菜单类型，NavMenu/Drawer
  menuStatus: getMenuStatus(),
  // 页签对应的页面
  // key: 页签id
  // value: 页面中需要保存的store数据都保存在value对象中
  pages: {
    ...fixedPages
  },
  // 用户信息
  user: {
    orgCode: '010101'
  },
  // 字典数据
  dicOptions: {}
}

const vuexState = window.sessionStorage.getItem('vuexState');

if (vuexState) {
  state = JSON.parse(Base64.decode(vuexState));
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});