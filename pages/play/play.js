const app = getApp();
const getRandom = require("../../utils/util.js").getRandom;
const shuffle = require("../../utils/util.js").shuffle;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    issues: '',
    progress: 100,
    id: undefined,
    clicked: false,
    reqDone: false,
    interval: undefined,
    lst: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://wuqio.mixue.ink/wxapp/json',
      success: (res)=>{
        var tmpLst = new Array();
        for(var i=0; i<res.data.length; i++){
          tmpLst[i] = i;
        }
        shuffle(tmpLst);
        this.setData({
          issues: res.data,
          reqDone: true,
          lst: tmpLst
        });
        console.log(res.data);
        console.log(tmpLst);
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
        that.toNext();
      }
      pct--;
    }, 100);
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
    let t = parseInt(e.target.dataset.id);
    this.setData({
      id: t,
      clicked: true
    });
    setTimeout(() => {
      var tmpLst = this.data.lst;
      tmpLst.pop();
      this.setData({
        progress: 100,
        id: -1,
        clicked: false,
        lst: tmpLst
      });
      //倒计时条
      clearInterval(this.data.interval);
      this.countDown();
    }, 1000);
  },
  toNext: function(){
    let that = this;
    (function(){
      var tmpLst = that.data.lst;
      tmpLst.pop();
      that.setData({
        progress: 100,
        id: -1,
        clicked: false,
        lst: tmpLst
      });
      //倒计时条
      // clearInterval(this.data.interval);
      that.countDown();
    })();
  }
})
