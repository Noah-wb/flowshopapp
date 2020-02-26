var local = getApp().globalData.local
let goodsList = [
  { actEndTime: '2020/02/26 22:42:43' },

]
Page({
  data: {
    countDownList: [],
    actEndTimeList: [],
    curIndex: 0,
    good:[],
    len:0,
    notIndex:true
  },
  onLoad(options) {
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    goodsList.forEach(o => { endTimeList.push(o.actEndTime) })
    this.setData({ actEndTimeList: endTimeList });
    // 执行倒计时函数
    this.countDown();

    var that = this;
    var list = JSON.parse(options.good)
    console.log(list)
    that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
      good: list

    })
     this.len();
  },
  len:function(){
    var that=this
    var gId = that.data.good.goods.gId.toString();
    var count = that.data.good.g_count
    wx.request({
      url: local + 'group/len?gId=' + gId,
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },

      method: 'POST',
      success: function (res) {
        var len = res.data
        console.log(len)
        that.setData({
          len: len
        })
        if (len == count){
          that.setData({
            notIndex:false
          })
        }
      }
    })
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
        this.setData({
          notIndex:false
        })
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  buySingle: function (e) {
    var good =this.data.good 
    var gId=good.goods.gId;
    var gName=good.goods.gName;
    var gImage=good.goods.gImage;
    var gPrice = good.goods.gPrice;
    var goods={
      gId:gId,
      gName:gName,
      gImage:gImage,
      gPrice:gPrice,
    }

    var goods = JSON.stringify(goods)
    console.log(goods)
    wx.navigateTo({
      url: '/pages/group_list/group_order/group_order?goods=' + goods,
    })
  },


  buyByGroup: function (e) {
    var good = this.data.good
    var gId = good.goods.gId;
    var gName = good.goods.gName;
    var gImage = good.goods.gImage;
    var gPrice = good.group_price;
    var goods = {
      gId: gId,
      gName: gName,
      gImage: gImage,
      gPrice: gPrice,
    }

    var goods = JSON.stringify(goods)
    console.log(goods)
    wx.navigateTo({
      url: '/pages/group_list/group_pay/group_pay?goods=' + goods,
    })
  },
})
