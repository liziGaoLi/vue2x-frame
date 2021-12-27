const AMS = require('gl-ajax-mock');
const apis = require('./api');

const ams = new AMS({
  baseUrl: '/bdsp/',
  method: 'GET',
  port: '3333',
  cors: true,
  format: {
    msgKey: 'sub_msg',
    dataKey: 'data',
    codeKey: 'sub_code',
    succCode: '000000'
  },
  resFormat: {
    msgKey: 'sub_msg',
    dataKey: 'data',
    codeKey: 'sub_code',
    succCode: '000000'
  }
});

for (let api of apis) {
  ams.api(api.url, api.func)
}

ams.start();