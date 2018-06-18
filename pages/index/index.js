//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    verse: "爱是不加害于人的，所以爱就完全了律法。（罗13:10）\nLove does no harm to its neighbor. Therefore love is the fulfillment of the law.(Rom 13:10)",
    verseTitle: "每日金句",
    notice: ""
  },
  onLoad: function () {
    //获取金句标题
    wx.request({
      url: 'https://wuqio.mixue.ink/wxapp/verseTitle',
      success: (res)=>{
        let verseTitle = res.data;
        this.setData({
          verseTitle:verseTitle
        });
      }
    })

    //获取金句内容
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
    //获取notice
    wx.request({
      url: 'https://wuqio.mixue.ink/wxapp/noticeServlet',
      success: (res)=>{
        this.setData({
          notice: res.data
        });
      }
    })
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
