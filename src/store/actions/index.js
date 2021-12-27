import ajax from "../../common/ajax";
import {
  SAVE_DIC_OPTIONS
} from "../mutations/types";

export default {
  /**
   * 获取字典数据, 项目获取的所有字典数据保存在state.dicOptions中，如果
   * @param {String|Array} payload 字典接口的apiId
   */
  getCommonDicOptions: async ({state, commit}, payload) => {
    if (typeof payload === 'string') payload = [payload];
    const dicOptions = {};
    for(let key of payload) {
      if (!state.dicOptions[key]) {
        try {
          const {rows} = await ajax.request(key);
          dicOptions[key] = rows;
        }
        catch (e) {
          console.error(`获取字典数据(${key})失败：`, e);
        }
      }
    }
    if (Object.keys(dicOptions).length > 0) commit(SAVE_DIC_OPTIONS, dicOptions);
  }
}