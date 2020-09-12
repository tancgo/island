// pages/my/my.js
import { getMyBookCount } from '../../api/book.js'
import { getMyFavor } from '../../api/classic'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;

    console.log(userInfo, 'userInfo');

    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true,
      });
    }
  },

  // 判断是否授权
  userAuthorized() {
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              console.log(res, 'getUserInfo');
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  async _getMyBookCount() {
    const res = await getMyBookCount()
    console.log(res, 'getMyBookCount')
    if (res) {
      this.setData({
        bookCount: res.count
      })
    }
  },

  async _getMyFavor() {
    const res = await getMyFavor()
    console.log(res, '_getMyFavor');
    if (res) {
      this.setData({
        classics: res
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onJumpToDetail(event) {
    console.log(event.detail, 'event.detail');
    const { id, type } = event.detail
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${id}&type=${type}`
    })
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
    this.userAuthorized()
    this._getMyBookCount()
    this._getMyFavor()
    // wx.getUserInfo({
    //   success: data => {
    //     console.log(data)
    //   }
    // })
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

  }
})