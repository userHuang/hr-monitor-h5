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

    onShow: function () {
        this.getIsFirstLogin()
    },

    async getIsFirstLogin () {
      wx.clearStorageSync()
      wx.login({
          success: async (res) => {
              const loginCode = res.code
              const resData = await $https({
                  url: 'hrpz/weChat/loginByCode',
                  method: 'POST',
                  data: {
                      loginCode
                  },
                  showMsg: false
              })
              if (resData.code ===  200) {
                  if (resData.data.authToken) {
                      wx.setStorageSync('token', resData.data.authToken)
                      this.setData({
                          hasAuth: true
                      })
                  }
              } else {
                  this.setData({
                      hasAuth: false
                  })
              }
          }
      })
  },
    
    viewListTap () {
        wx.navigateBack()
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
                wx.navigateBack()
            }
        })
    }
})