import { getLatest } from '../../api/classic.js'
import { like } from '../../api/like.js'

// const classic = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await getLatest();

    if (res?.fav_nums) {
      const { fav_nums, like_status } = res;
      this.setData({
        classic: res,
        likeCount: fav_nums,
        likeStatus: like_status
      })
    }
  },

  onLike: function (event) {
    console.log(event.detail);

    const behavior = event.detail.behavior
    const { id, type } = this.data.classic
    // 发送点赞或者取消点赞请求
    like(behavior, id, type)
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