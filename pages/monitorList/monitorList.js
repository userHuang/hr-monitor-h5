// pages/monitorList/monitorList.js
import $https from '../service/http.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusData: [{
            name: '全部设备',
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
        deviceData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.getNums()
        this.getDataList(null)
    },

    async getNums () {
        const resData = await $https({
            url: 'hrpz/iot/device/camera/countInfo',
            method: 'POST'
        })
        const {totalCount, onlineCount, offlineCount} = resData.data
        const statusData = this.data.statusData
        statusData[0].value = totalCount
        statusData[1].value = onlineCount
        statusData[2].value = offlineCount
        this.setData({
            statusData
        })
    },
    async getDataList (status, value) {
        const resData = await $https({
            url: 'hrpz/iot/device/camera/list',
            method: 'POST',
            data: {
                status,
                pageNum: 1,
                pageSize: 10,
                searchValue: value ? value : '' 
            }
        })
        console.log(resData, '==resData====')
        this.setData({
            deviceData: resData.rows || []
        })
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
        const status = statusData[index].status
        this.getDataList(status)
    },

    inputSearch (e) {
        console.log(e, '==ee===s====')
        const value = e.detail.value
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            console.log(value, '====value===')
            if (value) {
                const arr = this.data.statusData.filter(item => item.active)
                this.getDataList(arr[0].status, value)
            }
        }, 1000)
    },

    viewDeviceDetail (e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../deviceDetail/deviceDetail?id=' + id
        })
    }
})