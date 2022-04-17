const token = wx.getStorageSync('token') || 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijc1OGY1NTE4LTY3NTYtNGY0ZS1hN2M4LWNiODJiNTE5ZDM4MyJ9.pAZH_eGG-AtEHcITwfHpQrC-a1iCiPeEgol74NQf2GUwcSbmmbIaMyQRBPfd5vLFNJise42cHyF4a4NdEWHVYA'

const baseUrl = 'http://10.40.11.104:10081/'

const $https = ({url, method, data, header}) => {
    return new Promise((resove, reject) => {
        let obj = {
            url: `${baseUrl}${url}`,
            data,
            header: {
                'content-type': 'application/json'
            }
        }
        obj['header']['Authorization'] = token
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