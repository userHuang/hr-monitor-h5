// pages/home/home.js
import $https from '../service/http.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    viewListTap () {
        wx.navigateTo({
            url: '../monitorList/monitorList'
        })
    },

    getPhoneNumber (e) {
        console.log(e, '=e=====')
        const {iv, encryptedData} = e.detail
        const wxAppId = 'wxeae012dbaa2d39f4'
        wx.login({
            success: async (res) => {
                console.log(res, '====res====')
                const loginCode = res.code
                const resData = await $https({
                    url: 'hrpz/weChat/login',
                    method: 'POST',
                    data: {
                        encryptedData,
                        iv,
                        loginCode,
                        wxAppId
                    }
                })
                console.log(resData, '==resData====')
                wx.navigateTo({
                    url: '../monitorList/monitorList'
                })
            }
        })
        wx.getSetting({
            success (res){
                console.log(res, '=====ss====')
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                
              }
            }
        })
    }
})