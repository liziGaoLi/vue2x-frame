import {
  CHANGE_CURRENT_TAB_ID
} from './types';

export default {
  [CHANGE_CURRENT_TAB_ID]: (state, payload) => {
    return state.currentTabId = payload;
  }
}