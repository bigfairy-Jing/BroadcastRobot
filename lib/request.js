// 对request做一个简单的封装
const request = require('request')

module.exports = {
  get(url, query = {}) {
    return new Promise((resolve, reject) => {
      const _url = `${url.includes('?')?url:`${url}?`}${Object.entries(query).map(x => (`${x[0]}=${x[1]}`)).join('&')}`;
      request(_url, function (err, response, body) {
        if (!err && response.statusCode === 200) {
          resolve(JSON.parse(body))
        } else {
          reject(body)
        }
      })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: params
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject(body)
        }
      });
    })
  }
}