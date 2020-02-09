// pages/list1/list1.js
var local = getApp().globalData.local
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    
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
    var that = this
    wx.request({
      url: local+'goods/newlist',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'GET',
      data: {},
      success: function (res) {
        
        var goodlist=res.data
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  addgoods: function (e) {
    let index = e.currentTarget.dataset.index;
    var good = JSON.stringify(this.data.goods[index]);
    console.log(good.txt)
    wx.navigateTo({
      url: '../details/details?good=' + good,
    })
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