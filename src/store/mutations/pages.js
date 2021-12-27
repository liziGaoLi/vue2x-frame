import {
  CHANGE_PAGE_STATE
} from "./types";

export default {
  [CHANGE_PAGE_STATE]: (state, payload) => {
    const pageId = payload.pageId || state.currentTabId;
    state.pages[pageId] = { ...state.pages[pageId], ...payload.data };
  }
}