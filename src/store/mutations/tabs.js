import {
  ADD_TAB,
  DELETE_TAB,
  DELETE_ALL_TAB
} from './types';


export default {
  // 添加页签
  [ADD_TAB]: (state, payload) => {
    state.tabs = [...state.tabs, payload];
    state.pages = {...state.pages, [payload.id]: {}};
  },
  // 删除页签
  [DELETE_TAB]: (state, payload) => {
    const index = state.tabs.findIndex(tab => tab.id === payload);
    state.tabs.splice(index, 1);
    delete state.pages[payload];
  },
  // 删除全部页签
  [DELETE_ALL_TAB]: (state) => {
    state.tabs = state.tabs.filter(tab => tab.fixed);
    state.currentTabId = state.tabs[0].id;
    const prevPages = {...state.pages};
    const nextPages = {};
    state.tabs.forEach(tab => nextPages[tab.id] = prevPages[tab.id]);
    state.pages = nextPages;
  }
}