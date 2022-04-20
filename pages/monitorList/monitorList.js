// pages/monitorList/monitorList.js
import $https from '../service/http.js'
import {appId} from '../../utils/util.js'

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
        searchValue: ''
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
                searchValue: value || this.data.searchValue
            }
        })
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
        const resData = await $https({
            url: `hrpz/iot/device/camera/detail/${id}`,
            method: 'GET'
        })
        console.log(resData, '==getDeatil====')
        const {accessToken, deviceSerial, channelNo} = resData.data
        wx.navigateToMiniProgram({
            appId,
            path: 'pages/live/live?accessToken=' + accessToken + '&deviceSerial='+deviceSerial+'&channelNo=' + channelNo,
            success(res) {
                // 打开成功
            },
            fail (res) {
                console.log('--ee----')
            }
        })
    }
})