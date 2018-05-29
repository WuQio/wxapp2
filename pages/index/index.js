//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    verse:""
  },
  onLoad: function () {
    wx.request({
      url: 'https://wuqio.mixue.ink/wxapp/verseServlet',
      success: (res)=>{
        let finalVerse = res.data.replace("<p>", "").replace("</p>", "").replace("<br/>", "");
        console.log(finalVerse);
        this.setData({
          verse:finalVerse
        })
      }
    });
  },
  turnToPlay: function(){
    wx.redirectTo({
      url: '../play/play',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
