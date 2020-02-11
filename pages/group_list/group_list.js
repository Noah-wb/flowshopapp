// pages/group_list/group_list.js
var local = getApp().globalData.local
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: local + 'recommend/recommends',
      method: 'GET',
      data: {},
      success: function (res) {
        var goodlist = res.data

        console.log(goodlist)
        if (goodlist == null) {
          var toastTest = '获取数据失败';
          wx.showToast({
            title: toastTest,
            icon: '',
            duration: 2000 /*持续时间2秒*/
          });
        } else {
          that.setData({
            goods: goodlist
          });
        }
      }
    })
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

  }
})