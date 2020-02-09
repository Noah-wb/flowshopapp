// pages/category/category.js
var local = getApp().globalData.local
Page({
  data:{
    curIndex: 0,
    isScroll: false,
    toView: 1,
    category:[],
    goods:[]

  },
  addgoods: function (e) {
    let index = e.currentTarget.dataset.index;
    var good = JSON.stringify(this.data.goods[index]);
    wx.navigateTo({
      url: '../details/details?good=' + good,
    })
  },
  onShow:function(){
    this.switchTab
  },
  onLoad:function(){
    let that = this
    let id = this.data.curIndex
    id = id + 1
    wx.request({
      url: local+'type/list',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'GET',
      data: {},
      success: function (res) {

        var type = res.data
        if (type == null) {
          var toastTest = '获取数据失败';
          wx.showToast({
            title: toastTest,
            icon: '',
            duration: 2000 /*持续时间2秒*/
          });
        } else {
          that.setData({
            category: type
          });
        }

      }
    })
   
    wx.request({
      url: local+'goods/goodtype?tId=' + id,
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'GET',
      data: {},
      success: function (res) {

        var goodslist = res.data
        if (goodslist == null) {
          var toastTest = '获取数据失败';
          wx.showToast({
            title: toastTest,
            icon: '',
            duration: 2000 /*持续时间2秒*/
          });
        } else {
          that.setData({
            goods: goodslist
          });
        }

      }
    })
    
  },

  switchTab(e) {
    var that = this
    const self = this;
    
    this.setData({
      isScroll: true
    })
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index,
      })
    let id = this.data.curIndex
    id = id + 1
    wx.request({
      url: local+'goods/goodtype?tId=' + id,
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'GET',
      data: {},
      success: function (res) {

        var goodslist = res.data
        if (goodslist == null) {
          var toastTest = '获取数据失败';
          wx.showToast({
            title: toastTest,
            icon: '',
            duration: 2000 /*持续时间2秒*/
          });
        } else {
          that.setData({
            goods: goodslist
          });
        }

      }
    })
    }, 
    
   
    
  
  
})