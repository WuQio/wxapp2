const app = getApp();
let issue = [];
const getRandom = require("../../utils/util.js").getRandom;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    issues: '',
    idx: 0,
    progress: 100,
    id: undefined,
    clicked: false,
    reqDone: false,
    interval: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://wuqio.mixue.ink/wxapp/json',
      success: (res)=>{
        this.setData({
          issues: res.data,
          idx: 41,
          reqDone: true
        });
        console.log(res.data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.countDown();
  },

  /**
   * 倒计时条功能函数
   */
  countDown: function () {
    let pct = 100;
    let that = this;
    let interval = setInterval(() => {
      that.setData({
        progress: pct
      });
      if (pct === 0) {
        clearInterval(interval);
      }
      pct--;
    }, 150);
    this.setData({
      interval: interval
    });
  },

  /**
   * 点击选项按钮
   */
  choose: function(e){
    if (this.data.clicked){
      return;
    }
    let t = e.target.dataset.id;
    this.setData({
      id: t,
      clicked: true
    });
    setTimeout(() => {
      this.setData({
        idx: this.data.idx + 1,
        progress: 100,
        id: -1,
        clicked: false
      });
      //倒计时条
      clearInterval(this.data.interval);
      this.countDown();
    }, 1000);
  },
  toNext: function(){
    
  }
})
