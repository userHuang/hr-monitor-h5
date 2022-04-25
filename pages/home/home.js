// pages/home/home.js
import $https from '../service/http.js'
import {appId} from '../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasAuth: false
    },
    
    viewListTap () {
        wx.navigateTo({
            url: '../monitorList/monitorList'
        })
    },

    getPhoneNumber (e) {
        wx.clearStorageSync()
        const {iv, encryptedData} = e.detail
        wx.login({
            success: async (res) => {
                const loginCode = res.code
                const resData = await $https({
                    url: 'hrpz/weChat/login',
                    method: 'POST',
                    data: {
                        encryptedData,
                        iv,
                        loginCode,
                        wxAppId: appId
                    }
                })
                this.setData({
                    hasAuth: true
                })
                wx.setStorageSync('token', resData.data.authToken)
                wx.navigateTo({
                    url: '../monitorList/monitorList'
                })
            }
        })
    }
})