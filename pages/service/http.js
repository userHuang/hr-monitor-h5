const baseUrl = 'http://10.40.11.104:10081/'

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
              console.log(res, 'res=request===')
              if (res.data.code !== 200 && showMsg) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                })
                reject()
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