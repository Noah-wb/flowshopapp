var searchArray = [];
var that = this;
var local = getApp().globalData.local
Page({
  data: {
    history: [],//历史记录
    hot: ['百合花束', '康莱馨', '精品玫瑰花束'],//推荐
    result: [],
    showKeywords: false,
    keywords: [],//相似
    value: '',//输入的值
    showResult: false,
  },
  cancelSearch() {
    this.setData({
      showResult: false,
      showKeywords: false,
      value: ''
    })
  },
  input_txt:function(e){
      this.setData({
        value: e.detail.value
      })
      
  },
  addgoods: function (e) {
    let index = e.currentTarget.dataset.index;
    var good = JSON.stringify(this.data.result[index]);
    console.log(good.txt)
    wx.navigateTo({
      url: '../details/details?good=' + good,
    })
  },
  keywordHandle(e){
    const text = e.target.dataset.text;
    var that = this
    this.setData({
      value: text,
      showKeywords: false,
      showResult: true
    })

    wx.request({
      url: local +'goods/searchgoods?gName=' + text,
      method: 'GET',
      data: {},
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      success: function (res) {
        var searchgoods = res.data
        console.log(searchgoods[0])
        if (searchgoods == null) {
          var toastTest = '获取数据失败';
          wx.showToast({
            title: toastTest,
            icon: '',
            duration: 2000 /*持续时间2秒*/
          });
        } else {
          that.setData({

            result: searchgoods
          })
        }

      }
    })
  },
  searchInput(e) {
      if(this.data.value ==""){
        wx.showToast({
          title: '商品名不为空',
          duration: 1000
        })
        return;
      }else{
        this.setData({
          showResult: true,
          showKeywords: true,
        })
        var that = this
        var input = this.data.value
        wx.request({
          url:local+ 'goods/searchgoods?gName=' + input,
          method: 'GET',
          data: {},
          header: {
            'Content-Type': 'application/json;charset=UTF-8;'
          },
          success: function (res) {
            var searchgoods = res.data
            console.log(searchgoods[0])
            if (searchgoods == null) {
              var toastTest = '获取数据失败';
              wx.showToast({
                title: toastTest,
                icon: '',
                duration: 2000 /*持续时间2秒*/
              });
            } else {
              that.setData({
               
                result: searchgoods
              })
            }

          }
        })
      }
      this.historyHandle(this.data.value)
      },
    // if (!e.detail.value) {
    //   this.setData({
    //     showKeywords: true
    //   })
    // } else {
    //   if (!this.data.showKeywords) {
    //     timeId && clearTimeout(timeId);
    //     timeId = setTimeout(() => {
    //       this.setData({
    //         
    //         
    //       })
    //     })
       
    // }
  
  

  historyHandle(value) {
    value = this.data.value
    this.setData({
      showKeywords: false,
      showResult: true
    })
    if(wx.getStorageSync('history').length>0 && wx.getStorageSync('history').length<7){
      let index = wx.getStorageSync("history").indexOf(value)
      if (index < 0) {//数据不存在时直接追加
        searchArray = wx.getStorageSync("history").concat(value)
        wx.setStorageSync("history", searchArray)
      } else {//数据已存在时调到头部
        searchArray = wx.getStorageSync("history")
        searchArray.splice(index, 1)
        searchArray = searchArray.concat(value);
        wx.setStorageSync("history", searchArray)
      } 
    } else if (wx.getStorageSync("history").length >= 8) {//大于指定数量
      let index1 = wx.getStorageSync("history").indexOf(value)
      if (index1 > -1) {//数据已存在时掉到头部
        searchArray = wx.getStorageSync("history")
        searchArray.splice(index1, 1)
        searchArray = searchArray.concat(value);
        wx.setStorageSync("history", searchArray)
        return;
      }
      //数据不存在时删除第一个后追加
      searchArray = wx.getStorageSync("history")
      searchArray.splice(0, 1)
      searchArray = searchArray.concat(value);
      wx.setStorageSync("history", searchArray)
1


    }else{
      searchArray = searchArray.concat(value)
      wx.setStorageSync("history", searchArray)
    }
    this.setData({
      history:searchArray
    })

    // let history = this.data.history;
    // const idx = history.indexOf(value);
    // if (idx === -1) {
    //   // 搜索记录只保留8个
    //   if (history.length > 7) {
    //     history.pop();
    //   }
    // } else {
    //   history.splice(idx, 1);
    // }
    // history.unshift(value);
    // wx.setStorageSync('history', JSON.stringify(history));
    // this.setData({
    //   history: history  
    // });
  },
  onLoad() {
    const history = wx.getStorageSync('history');
    if (history) {
      this.setData({
        history: history
      })
      console.log(this.data.history);
    }
  }
})