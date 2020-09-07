import { getDetail, getLikeStatus, getComments, postComment } from '../../api/book.js'
import { like } from '../../api/like.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading()
    const { id } = options;
    const detail = await getDetail(id)
    const comments = await getComments(id)
    const likeStatus = await getLikeStatus(id)

    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
        // likeStatus: true,
        // likeCount: 12
      })
      wx.hideLoading()
    })
  },

  onLike(event) {
    const { behavior } = event.detail
    // 发送点赞或者取消点赞请求
    like(behavior, this.data.book.id, 400)
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancel() {
    this.setData({
      posting: false
    })
  },

  async onPost(event) {
    console.log(event.detail)
    const comment = event.detail.text || event.detail.value

    if (!comment) return

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    const res = await postComment(this.data.book.id, comment)

    if (res) {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})