const APP_ID = 'wx4db71e19e3108c18'; //输入小程序appid  
const APP_SECRET = '84c4d367085ade3878c29a675c9afef5'; //输入小程序app_secret  
var OPEN_ID = '' //储存获取到openid  
var SESSION_KEY = '' //储存获取到session_key  
var local = getApp().globalData.local
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    good: [],
  },

  onReady() {

    this.getOpenIdTap();

  },

  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          header: {
            'Content-Type': 'application/json;charset=UTF-8;'
          },
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid; //获取到的openid  
            SESSION_KEY = res.data.session_key; //获取到session_key  
            console.log(OPEN_ID)
            console.log(SESSION_KEY)
            that.setData({
              openid: res.data.openid,
              session_key: res.data.session_key,
            })
          }
        })
      }
    })
  },
  onLoad(options) {
    var that = this;
    var list = JSON.parse(options.goods)
    console.log(list)
    that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
      good: list

    })
  },
  onShow: function () {
    const self = this;


    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },


  getorderitem() {
    // let that = this;
    // wx.request({
    //   url: local + 'order/selectono',
    //   header: {
    //     'Content-Type': 'application/json;charset=UTF-8;'
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     let good = that.data.good;
    //     let orderno = res.data
    //     console.log(orderno)
    //     var gId = good.gId
    //     console.log(gId)
    //     var ono = orderno

    //     wx.request({
    //       url: local + 'orderitem/group_f?gId=' + gId + '&ono=' + ono,


    //       method: 'POST',
    //       success: function (res) {
    //         if (res == null) {
    //           var toastTest = '获取数据失败';
    //           wx.showToast({
    //             title: toastTest,
    //             icon: '',
    //             duration: 2000 /*持续时间2秒*/
    //           });
    //         } else {
    //           console.log(res)
    //         }
    //       }
    //     })
    //   }
    // })



  },

  toPay() {
    var that = this
    var uname = that.data.address.name
    var phone = that.data.address.phone
    var address = that.data.address.detail
    var total = that.data.good.gPrice.toString()
    var gid = that.data.good.gId.toString()

    wx.request({
      url: local + 'group/groupbuy',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'GET',
      data: {
        gId: gid,
        uid: OPEN_ID,
        uname: uname,
        phone: phone,
        address: address,
        total: total
      },
      success: function (res) {
        var re = res.data
        if (re == null) {
          var toastTest = '获取数据失败';
          wx.showToast({
            title: toastTest,
            icon: '',
            duration: 2000 /*持续时间2秒*/
          });
        } else {
          that.getorderitem();

          wx.switchTab({
            url: '/pages/index/index'
          })
          wx.showToast({
            title: '支付成功！',
            duration: 2000,
          })



        }


      },
    })
  }




})