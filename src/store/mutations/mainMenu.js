import {
  CHANGE_MENU_STATUS
} from "./types";

export default {
  [CHANGE_MENU_STATUS]: (state, payload) => {
    state.menuStatus = {
      ...state.menuStatus,
      ...payload
    }
  }
}