 // page/component/details/details.js
Page({
  data: {
    goods: {
      // t_id:'',
      // t_image:'',
      // t_title:'',
      // t_price:'',
      // stock: '',
      // detail: '',
      // service: '',
      // num: 1,
     
    },
    // //b.js 页面接收参数
    // onLoad: function (options) {       //options用于接收上个页面传递过来的参数
    //   var that = this;
    //   that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
    //     b_id: options.id,     //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
    //     b_tu: options.tu,
    //   })
    // }
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },
    onLoad: function (options) {       //options用于接收上个页面传递过来的参数
      var that = this;
      var list = JSON.parse(options.good)
      console.log(list)
      that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
      goods :list

      })

    },
  bindManual: function (e) {
    var num = e.detail.value;
    this.setData({
      num: num,
    })
  },

  bindMinus () {
    var num = 'this.data.goods.gNum';
    if (this.data.goods.gNum > 1) {
      this.data.goods.gNum = this.data.goods.gNum - 1,
      this.setData({
        goods :this.data.goods
      })
    }
    console.log(this.data.goods.gNum);
    console.log("刚刚您点击了-1");
  },
  /*点击加号*/
  bindPlus () {
    var num = 'this.data.goods.gNum';
    this.data.goods.gNum = this.data.goods.gNum + 1,
    this.setData({
      goods: this.data.goods
    })
    console.log(this.data.goods.gNum);
    console.log("刚刚您点击了加1");
  },
  /*输入框事件*/


  addToCart:function(e){
    var goods = this.data.goods;
    var num = this.data.goods.gNum;
    var title = this.data.goods.gName;
    var arr  = wx.getStorageSync('cart') || [];
    let total = this.data.totalNum;
    console.log("arr,{}", arr);
    if(arr.length >0){
      for (var j in arr) {
       var aid = arr[j].gId;
        var gid =goods.gId;
        // 判断购物车内的item的id，和事件传递过来的id，是否相等
        if (aid == gid ) {
          arr[j].gNum = arr[j].gNum + goods.gNum;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {

            wx.setStorageSync('cart', arr)

          } catch (e) {

            console.log(e)

          }
          this.setData({
            hasCarts: true,
            totalNum: num+total
          })
      }else{
          arr.push(goods);
          console.log(arr.toString());
          try {

            wx.setStorageSync('cart', arr)

          } catch (e) {

            console.log(e)

          }
          this.setData({
            hasCarts: true,
            totalNum: num + total
          })
      }
        
        
      return;
    } 
      
  }
  else{
    arr.push(goods);
      this.setData({
        hasCarts: true,
        totalNum: num + total
      })
  }
    // 最后，把购物车数据，存放入缓存  

    try {

      wx.setStorageSync('cart', arr)

      return;

    } catch (e) {

      console.log(e)

    }
    
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }

})

