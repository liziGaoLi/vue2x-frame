import Ajax from 'gl-ajax/dist/ajax-axios.es';
import axios from 'axios';
import api from './api'
import server from "./server";

const ajax = new Ajax({
  server,
  api,
  requestFilter: async (data, options) => {
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    return data;
  },
  responseFilter: async (res) => {
    return res;
  },
  errorFilter: async (err) => {
    return err;
  }
}, axios);

export default ajax