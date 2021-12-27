import {
  SAVE_DIC_OPTIONS,
  DELETE_DIC_OPTION
} from './types';

export default {
  // 保存字典数据
  [SAVE_DIC_OPTIONS]: (state, payload) => {
    state.dicOptions = {
      ...state.dicOptions,
      ...payload
    }
  },
  // 删除state中保存的字典数据
  [DELETE_DIC_OPTION]: (state, key) => {
    delete state.dicOptions[key];
  }
}