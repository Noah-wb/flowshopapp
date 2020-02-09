// pages/orders/orders.js
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
        orders: [],
      },

      onReady() {
        this.getTotalPrice();
        this.getOpenIdTap();
       
      },

      getOpenIdTap: function() {
        var that = this;
        wx.login({
          success: function(res) {
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
              success: function(res) {
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
      onShow: function() {
        const self = this;
        var arr = wx.getStorageSync('cart');

        self.setData({
          orders: arr
        })
        
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

      /**
       * 计算总价
       */
      getTotalPrice() {
        let orders = this.data.orders;
        console.log(orders)

        
        let total = 0;
        for (let i = 0; i < orders.length; i++) {
          total += orders[i].gNum * orders[i].gPrice;
        }
        this.setData({
          total: total
        })
      },
  getorderitem() {
    let orders = this.data.orders;
    let that = this;
    wx.request({
      url: local+'order/selectono',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'GET',
      success:function(res){
         let orderno = res.data
        console.log(orderno)
        var OrderItem = [];
        for (let i = 0; i < orders.length; i++) {
          var obj = orders[i];
          var gNum = obj.gNum.toString()
          var gId = parseInt(obj.gId)
          var ono = orderno
          var Orderitem={
               gId: gId ,
               gNum: gNum ,
                ono: ono ,
               
            
          }
          OrderItem.push(Orderitem)
          console.log(OrderItem[0].ono)
         
        }
        wx.request({
          url: local + 'orderitem/add',


          method: 'POST',
          data: {
            OrderItem
          },
          success: function (res) {
            if (res == null) {
              var toastTest = '获取数据失败';
              wx.showToast({
                title: toastTest,
                icon: '',
                duration: 2000 /*持续时间2秒*/
              });
            } else {
              console.log(res)
            }
          }
        })
      }
    })
   
  

  },

      toPay() {
        var uname = this.data.address.name
        var phone = this.data.address.phone
        var address = this.data.address.detail
        var total = this.data.total
        var that = this
        wx.request({
          url: local+'order/add',
          header: {
            'Content-Type': 'application/json;charset=UTF-8;'
          },
          method: 'GET',
          data: {
            uid: OPEN_ID,
            uname: uname,
            phone: phone,
            address: address,
            total: total
          },
          success: function(res) {
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
              wx.showToast({
                title: '支付成功！',
                duration: 2000,
              })
              wx.removeStorage({
                key: 'cart',
                success(res) {
                  wx.switchTab({
                    url: "../index/index",
                  })
                },
              })


              

            }


          },
          })
 }
 
 
 
 
  })