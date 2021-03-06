// pages/deviceDetail/deviceDetail.js
import $https from '../service/http.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showAction: false,
        actionType: '',
        controllDir: '',
        voiceStatus: 'stop',
        deviceData: [{
            status: '1',
            name: '测试生产线2号摄像头',
            desc: '测试生产线B03电线杆往上20厘米'
        }],
        detailData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id
        this.getDeatil(id)
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

    async getDeatil (id) {
        const resData = await $https({
            url: `hrpz/iot/device/camera/detail/${id}`,
            method: 'GET'
        })
        console.log(resData, '==getDeatil====')
        this.setData({
            detailData: resData.data || {}
        })
        const {accessToken, deviceSerial, channelNo} = resData.data
        wx.navigateToMiniProgram({
            appId: 'wxeae012dbaa2d39f4',
            path: 'pages/live/live?accessToken=' + accessToken + '&deviceSerial='+deviceSerial+'&channelNo=' + channelNo,
            success(res) {
                // 打开成功
            },
            fail (res) {
                console.log('--ee----')
                wx.navigateBack()
            }
        })
    },

    statechange (e) {
        console.log(e, '==statechange====')
    },
    onError (e) {
        console.log(e, '==error====')
    },
    deviceAction (e) {
        const name = e.currentTarget.dataset.name
        this.setData({
            actionType: name
        })
    },
    dirSelect (e) {
        const name = e.currentTarget.dataset.name
        this.setData({
            controllDir: name
        })
    },
    hideActionBtn () {
        this.setData({
            actionType: '',
            controllDir: '',
            voiceStatus: 'stop'
        })
    },
    changeVoiceStatus () {
        const voiceStatus = this.data.voiceStatus
        this.setData({
            voiceStatus: voiceStatus === 'stop' ? 'starting' : 'stop'
        })
    }
})