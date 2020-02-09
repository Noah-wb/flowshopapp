// pages/user/user.js

var local = getApp().globalData.local
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb: '',
    nickname: '',
    orders: [],
    hasAddress: false,
    
    address: {}
  },
  onLoad: function (options) {
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        //console.log(res)
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
  },
  ordershow:function(){

    var that = this
    var test1 = "o4q9r5Z7UJ3t4wemW4UPKnB3YTT0"
    var list = []
 
    wx.request({
      url: local + 'order/allorder?uid=' + test1,
      method: 'GET',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },

      success: function (res) {
        list = res.data
        that.setData({
          orders: list
        })
      
        
      }
    })
   
  },
 
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
    self.ordershow();
  
  },
  
})