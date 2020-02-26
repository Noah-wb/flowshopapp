// pages/cart/cart.js

Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    obj: {
      name: "hello"
    }
  },
  onShow:function(){
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  

    var arr = wx.getStorageSync('cart') || [];

    console.info("缓存数据：" + arr);    // 有数据的话，就遍历数据，计算总金额 和 总数量  

    if (arr.length > 0) {

      // 更新数据  

      this.setData({

        carts: arr,

        hasList: true,

        hidden: false

      });

      console.info("缓存数据：" + this.data.carts);

    } else {

      this.setData({

        hasList: false,

        hidden: true,

      });

    }
  },
  addgoods: function (e) {
    let index = e.currentTarget.dataset.index;
    var good = JSON.stringify(this.data.carts[index]);
    console.log(good.txt)
 
    wx.navigateTo({
      url: '../details/details?good=' + good,
    })
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {

    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    var kaka = wx.setStorageSync('cart',carts);
    var getKaka = wx.getStorageSync('cart');
    this.setData({
      carts: getKaka
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }

  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].gNum;
    num = num + 1;
    carts[index].gNum = num;
    var kaka = wx.setStorageSync('cart', carts);
    var getKaka = wx.getStorageSync('cart');
    this.setData({
      carts: getKaka
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].gNum;
    
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].gNum = num;
    var kaka = wx.setStorageSync('cart', carts);
    var getKaka = wx.getStorageSync('cart');
    this.setData({
      carts: getKaka
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].gNum * carts[i].gPrice;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  }

})