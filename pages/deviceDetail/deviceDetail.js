// pages/deviceDetail/deviceDetail.js
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
        }]
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