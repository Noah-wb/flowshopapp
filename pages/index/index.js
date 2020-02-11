var local = getApp().globalData.local
Page({
  data: {
    imgUrls: [
      'cloud://syh-uik0l.7379-syh-uik0l-1256796177/imges/b1.jpg',
      'cloud://syh-uik0l.7379-syh-uik0l-1256796177/imges/b2.jpg',
      'cloud://syh-uik0l.7379-syh-uik0l-1256796177/imges/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,  
    goods: [],
  },
onLoad:function(){
  var that = this
  wx.request({
    url: local +'recommend/recommends',
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
  addgoods: function (e) {
    let index = e.currentTarget.dataset.index;
     var good = JSON.stringify(this.data.goods[index]);
    console.log(good.txt)
     wx.navigateTo({
       url: '../details/details?good='+good,
     }) 
  },
})



