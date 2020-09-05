import { config } from '../config.js'

const { api_base_url, appkey } = config;

const tips = {
  1: '出现错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

const api = {
  request: function (params) {
    // console.log(params, 'params');

    const { data, url, method = "GET" } = params;
    return new Promise((resolve, reject) => {
      wx.request({
        url: api_base_url + url,
        method,
        data,
        header: {
          'content-type': 'application/json',
          'appkey': appkey
        },
        success: (res) => {
          const code = res.statusCode.toString()

          if (code.startsWith('2')) {
            resolve(res?.data)
          }
          else {
            reject()
            const error_code = res?.data?.error_code
            this._show_error(error_code)
          }
        },
        fail: (err) => {
          reject()
          this._show_error()
        }
      })
    })
  },

  _show_error: function (error_code = 1) {
    const tip = tips[error_code]
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    })
  }
}

export { api }