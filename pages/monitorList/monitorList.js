// pages/monitorList/monitorList.js
import $https from '../service/http.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusData: [{
            name: '全部',
            value: 0,
            active: true,
            status: null
        }, {
            name: '正常',
            value: 0,
            active: false,
            status: 1
        }, {
            name: '异常',
            value: 0,
            active: false,
            status: 0
        }],
        deviceData: [],
        searchValue: '',
        hasPermission: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        this.getIsFirstLogin()
    },

    async getIsFirstLogin () {
        wx.clearStorageSync()
        wx.showLoading({
            title: '加载中',
        })
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
                wx.hideLoading()
                if (resData.code ===  200) {
                    if (resData.data.authToken) {
                        wx.setStorageSync('token', resData.data.authToken)
                        this.getDataList(null)
                    }
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '您还未登录，请先登录',
                        showCancel: false,
                        success (res) {
                          if (res.confirm) {
                            wx.navigateTo({
                                url: '../home/home'
                            })
                          }
                        }
                    })
                }
            }
        })
    },

    async getNums () {
        const resData = await $https({
            url: 'hrpz/iot/device/camera/countInfo',
            method: 'POST',
            showMsg: false,
            data: {
                searchValue: this.data.searchValue
            }
        })
        if (resData.code ===  200) {
            const {totalCount, onlineCount, offlineCount} = resData.data
            const statusData = this.data.statusData
            statusData[0].value = totalCount
            statusData[1].value = onlineCount
            statusData[2].value = offlineCount
            this.setData({
                statusData
            })
        }
        if (resData.code ===  403) {
            this.setData({
                hasPermission: false
            })
        }
        
    },
    async getDataList (status, value) {
        this.getNums()
        wx.showLoading({
            title: '加载中',
        })
        const resData = await $https({
            url: 'hrpz/iot/device/camera/list',
            method: 'POST',
            data: {
                status,
                pageNum: 1,
                pageSize: 10,
                searchValue: value || this.data.searchValue
            }
        })
        wx.hideLoading()
        this.setData({
            deviceData: resData.rows || []
        })
    },

    statusSelectTap (e) {
        const index = e.currentTarget.dataset.index
        const statusData = this.data.statusData
        statusData.forEach((item, i) => {
            item.active = index === i
        })
        this.setData({
            statusData
        })
        const status = statusData[index].status
        this.getDataList(status)
    },

    inputSearch (e) {
        const value = e.detail.value
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            this.setData({
                searchValue: value
            })
            const arr = this.data.statusData.filter(item => item.active)
            this.getDataList(arr[0].status)
        }, 800)
    },

    async viewDeviceDetail (e) {
        const id = e.currentTarget.dataset.id
        // wx.navigateTo({
        //     url: '../deviceDetail/deviceDetail?id=' + id
        // })
        wx.showLoading({
            title: '加载中',
        })
        const resData = await $https({
            url: `hrpz/iot/device/camera/detail/${id}`,
            method: 'GET'
        })
        wx.hideLoading()
        console.log(resData, '==getDeatil====')
        const {accessToken, deviceSerial, channelNo} = resData.data
        wx.navigateToMiniProgram({
            appId: 'wxf2b3a0262975d8c2',
            path: 'pages/live/live?accessToken=' + accessToken + '&deviceSerial=' + deviceSerial + '&channelNo=' + channelNo,
            success(res) {
                // 打开成功
            },
            fail (res) {
                console.log('--ee----')
            }
        })
    }
})