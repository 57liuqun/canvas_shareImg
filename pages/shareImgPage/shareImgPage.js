
var ctx = "" // 用于获取canvas
var canvasWidth1 = ""
var canvasHeight1 = ""
var ratio = 1  //字体大小跟分辨率比例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrCodeImg: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1923559453,2542615224&fm=26&gp=0.jpg',
    qrcodeUrl: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1923559453,2542615224&fm=26&gp=0.jpg", //小程序码

    //分享参数 
    canvasShow: false, //显示canvas和按钮
    canvasWidth: '', // canvas宽度
    canvasHeight: '', // canvas高度
    imagePath: "",//保存的图片路径
    imageSavePath: '', // 分享的图片路径
  },
  toShare() {
    //点击分享的时候
    //把banner图转为base64并存储本地路径
    let img = "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=637537861,1956659086&fm=26&gp=0.jpg";
    this.addCode()
    wx.showLoading({
      title: '图片生成中。。。',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ctx = wx.createCanvasContext('myCanvas');
    ctx.fillStyle = "#FFFFFF";

    //分享初始化数据
    var that = this
    var sysInfo = wx.getSystemInfo({
      success: function (res) {
        canvasWidth1 = res.windowWidth * 0.9
        canvasHeight1 = res.windowHeight * 0.85
        ratio = res.windowWidth / 375
        that.setData({
          canvasWidth: canvasWidth1,
          canvasHeight: canvasHeight1
        })
      },
    })

    // 清理分享图片的缓存
    wx.removeStorageSync('storageKeyUrl');
    wx.removeStorageSync('storageKeyUrlCode');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (this.data.mtId != "") {
    //   this.getDetail(this.data.mtId)
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    let sharePath = "pages/purchase/component/mertialNeed/metialNeddDetail/metialNeddDetail?id=" + that.data.mtId
    let userId = wx.getStorageSync('userInfo') != '' ? JSON.parse(wx.getStorageSync('userInfo')).userId : ''
    sharePath = sharePath + "&pid=" + userId;
    console.log(sharePath)
    return {
      title: that.data.companyInfo.title,
      path: sharePath,
      imageUrl: that.data.imageSavePath
    };
    // })

  },
  //保存图片
  savePicture: function () {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function success(res) {
        console.log(res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function success(res) {
            console.log(res)
            that.setData({
              // pView:true,
              imagePath: res.savedFilePath
            });

            // 保存图片到本地
            console.log(that.data.imagePath)
            wx.saveImageToPhotosAlbum({
              filePath: that.data.imagePath,
              success(res) {
                console.log(res)
                wx.showModal({
                  content: '图片已保存到相册，赶紧晒一下吧~',
                  showCancel: false,
                  confirmText: '好的',
                  confirmColor: '#333',
                  success: function (res) {
                    /* 该隐藏的隐藏 */
                    that.setData({
                      canvasShow: true
                    })
                  }
                })
              }, fail(res) {
                console.log(res)
                wx.showToast({
                  title: '图片保存失败~',
                  icon: 'none'
                })
              }
            })
          }
        });
      },
      fail(res) {
        console.log(res)
      }
    });
  },
  closeCanvas: function () {
    wx.removeStorage({
      key: 'storageKeyUrlCode'
    })
    wx.removeStorage({
      key: 'storageKeyUrl'
    })
    this.setData({
      canvasShow: false
    })
  },
  addTitleLeftBg: function () {
    var grad = ctx.createLinearGradient(canvasWidth1 * 0.035, canvasHeight1 * 0.57, canvasWidth1 * 0.245, canvasHeight1 * 0.52);
    grad.addColorStop(0, "#fde37e");
    grad.addColorStop(1, "#fe6d00");
    ctx.setFillStyle(grad);
    ctx.beginPath();
    ctx.moveTo(canvasWidth1 * 0.035, canvasHeight1 * 0.57);
    ctx.lineTo(canvasWidth1 * 0.21, canvasHeight1 * 0.57);
    ctx.lineTo(canvasWidth1 * 0.245, canvasHeight1 * 0.52);
    ctx.lineTo(canvasWidth1 * 0.07, canvasHeight1 * 0.52);
    //codeTemPath
    ctx.fill();
  },
  addTitleLeft: function () {
    var str = "广 告";
    let fontSize = parseInt(14 * ratio) + 'px';
    ctx.font = 'normal normal ' + fontSize + ' sans-serif';
    ctx.setTextAlign('center'); // 文字居中
    ctx.setFillStyle("#fff");
    ctx.fillText(str, canvasWidth1 * 0.14, canvasHeight1 * 0.555);
  },
  // 生成的小程序码添加文字说明
  addCodeWord: function () {
    var str1 = "扫码有惊喜";
    let fontSize = parseInt(18 * ratio) + 'px';
    ctx.font = 'normal normal ' + fontSize + ' sans-serif';
    ctx.setTextAlign('center'); // 文字居中
    ctx.setFillStyle("rgb(108,87,212)");
    ctx.fillText(str1, canvasWidth1 * 0.8, canvasHeight1 * 0.92);
  },
  addTitle: function () {
    var str = '测试文本测试文本测试文本测试文本测试文本';
    ctx.setFillStyle("#000");
    ctx.setTextAlign('left'); // 文字居中
    ctx.font = 'normal bold 14px sans-serif';
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(20 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.68,//一行文字最大宽度
      x: canvasWidth1 * 0.28,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.515,//文字在y轴要显示的位置
      maxLine: 1//文字最多显示的行数
    })
  },
  addDescn: function () {
    var str = "xx描述：";
    str += '测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本';
    ctx.font = 'normal normal 14px sans-serif';
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(15 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.93,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.59,//文字在y轴要显示的位置
      maxLine: 2//文字最多显示的行数
    })
  },
  addConAndCode1: function () {
    var str = "xx描述：";
    str += '测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本';
    ctx.font = 'normal normal 14px sans-serif';
    ctx.setFillStyle("#222");
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(14 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.58,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.69,//文字在y轴要显示的位置
      maxLine: 1//文字最多显示的行数
    })
  },
  addConAndCode2: function () {
    var str = "xx描述：";
    str += '测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本';
    ctx.font = 'normal normal 14px sans-serif';
    ctx.setFillStyle("#222");
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(14 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.58,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.76,//文字在y轴要显示的位置
      maxLine: 1//文字最多显示的行数
    })
    // let code 
    // ctx.drawImage(filePath, 185, 280, 100, 100)
  },
  addConAndCode3: function () {
    var str = "xx描述：";
    str += '测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本';
    ctx.font = 'normal normal 14px sans-serif';
    ctx.setFillStyle("#222");
    this.dealWords({
      ctx: ctx,//画布上下文
      fontSize: parseInt(14 * ratio),//字体大小
      word: str,//需要处理的文字
      maxWidth: canvasWidth1 * 0.58,//一行文字最大宽度
      x: canvasWidth1 * 0.035,//文字在x轴要显示的位置
      y: canvasHeight1 * 0.83,//文字在y轴要显示的位置
      maxLine: 2//文字最多显示的行数
    })

  },
  addCode(typeNum) {
    let that = this
    let promise1 = new Promise(function (resolve, reject) {
      let saveStr = "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=637537861,1956659086&fm=26&gp=0.jpg";
      wx.getImageInfo({
        src: saveStr,    //请求的网络图片路径
        success: function (res) {
          console.log(1)
          //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
          wx.setStorageSync('storageKeyUrl', res.path);
          resolve(res)
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      console.log(2)
      let saveStr2 = that.data.qrcodeUrl;
      console.log(saveStr2)
      wx.getImageInfo({
        src: saveStr2,    //请求的网络图片路径
        success: function (res) {
          console.log(3)
          //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
          wx.setStorageSync('storageKeyUrlCode', res.path);
          resolve(res)
        }
      })
    });
    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log(res)
      //主要就是计算好各个图文的位置
      ctx.fillStyle = '#ffffff';//然后就可以赋给fillStyle了
      ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
      //前两个参数表示矩形左上角的点的x,y坐标，w,h表示矩形的宽高。

      let img = wx.getStorageSync('storageKeyUrl')
      ctx.drawImage(img, canvasWidth1 * 0.035, canvasHeight1 * 0.025, canvasWidth1 * 0.93, canvasHeight1 * 0.45)
      this.addTitleLeftBg();
      this.addTitleLeft();
      this.addTitle();
      this.addDescn();
      this.addConAndCode1();
      this.addConAndCode2();
      this.addConAndCode3();
      //小程序码的说明文字
      this.addCodeWord()
      let imgCode = wx.getStorageSync('storageKeyUrlCode')
      console.log(imgCode)
      ctx.drawImage(imgCode, canvasWidth1 * 0.67, canvasHeight1 * 0.70, canvasWidth1 * 0.27, canvasWidth1 * 0.27)
      ctx.draw();
      this.setData({
        canvasShow: true
      })
      wx.hideLoading()
     
    })
    
  },
  //处理文字多出省略号显示
  dealWords: function (options) {
    options.ctx.setFontSize(options.fontSize);//设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth); //实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * (options.fontSize + 2 * ratio));    //(j+1)*18这是每一行的高度
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * (options.fontSize + 2 * ratio));
            }
            endPos += m;//下次截断点
            break;
          }
        }
      } else {//如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * (options.fontSize + 2 * ratio));
      }
    }
  },
})