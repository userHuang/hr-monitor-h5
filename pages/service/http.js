const baseUrl = 'http://39.99.241.210:9081/'

const $https = ({url, method, data, header, showMsg = true}) => {
    return new Promise((resove, reject) => {
        let obj = {
            url: `${baseUrl}${url}`,
            data,
            header: {
                'content-type': 'application/json',
                'Terminal-Type': 'MINI_PROGRAM'
            }
        }
        const token = wx.getStorageSync('token') || ''
        if (token) {
            obj['header']['Authorization'] = token
        }
        if (header) {
            obj['header'] = {...obj.header, ...header}
        }
        if (method) {
            obj['method'] = method
        }
        wx.request({
            ...obj,
            token,
            success (res) {
              if (res.data.code === 401) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                })
                setTimeout(() => {
                  wx.navigateTo({
                      url: '../home/home'
                  })
                }, 1000)
              }
              if (res.data.code !== 200 && showMsg) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                })
                reject(res.data)
              }
              resove(res.data)
            },
            fail (res) {
                reject({
                    success: false
                })
            }
        })
    })
}
export default $https