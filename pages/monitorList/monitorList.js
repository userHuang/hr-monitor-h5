// pages/monitorList/monitorList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusData: [{
            name: '全部设备',
            value: 23,
            active: true
        }, {
            name: '正常',
            value: 12,
            active: false
        }, {
            name: '异常',
            value: 3,
            active: false
        }],
        deviceData: [{
            status: '1',
            name: '测试生产线2号摄像头',
            desc: '测试生产线B03电线杆往上20厘米'
        }, {
            status: '2',
            name: '测试生产线2号摄像头',
            desc: '测试生产线B03电线杆往上20厘米'
        }, {
            status: '2',
            name: '测试生产线2号摄像头',
            desc: '测试生产线B03电线杆往上20厘米'
        }, {
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

    statusSelectTap (e) {
        console.log(e, '==e==')
        const index = e.currentTarget.dataset.index
        const statusData = this.data.statusData
        statusData.forEach((item, i) => {
            item.active = index === i
        })
        this.setData({
            statusData
        })
    },

    viewDeviceDetail (e) {
        wx.navigateTo({
            url: '../deviceDetail/deviceDetail'
        })
    }
})