// pages/orderdetail/orderdetail.j
var local = getApp().globalData.local
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderdetails: [],
    orders:{},
    total:null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  console.log(options)
    let ono = options.ono
    this.ordershow(ono);
    this.orderdetailsshow(ono);
      },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  ordershow: function (ono) {
    console.log(1)
    var that = this
    // var test1 = "20200201125357790000"
    var list = {}
    wx.request({
      url: local + 'order/ordershow?ono=' + ono,
      method: 'GET',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      success: function (res) {
      
        list = res.data

        console.log(list)
        that.setData({
          orders: list
        })
        var tatal = parseInt(that.data.orders.total)
        that.setData({
          total: tatal
        })
      }
    })
  },
  orderdetailsshow: function (ono) {
    var that = this
    var list1 = []
    let orderdetails = that.data.orderdetails
    // var ono = "20200201125357790000";
    wx.request({
      url: local + 'orderitem/detail?ono=' + ono,
      method: 'GET',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      success: function (res) {
        list1 = res.data
        console.log(list1)
        that.setData({
          orderdetails: list1
        })

      }
    })

    //}


  },
})