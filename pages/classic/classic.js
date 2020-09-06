import {
  getLatest,
  getClassic
} from '../../api/classic.js'
import {
  like
} from '../../api/like.js'

// const classic = new ClassicModel();

Component({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    likeCount: 0,
    likeStatus: false,
    latest: true,
    first: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached: async function (options) {
    const res = await getLatest();

    if (res && res.fav_nums) {
      const {
        fav_nums,
        like_status,
        index
      } = res;
      // 存贮最新的index值
      wx.setStorageSync('latest', index)
      this.setData({
        classic: res,
        likeCount: fav_nums,
        likeStatus: like_status
      })
    }
  },

  methods: {
    onLike: function (event) {
      console.log(event.detail);

      const behavior = event.detail.behavior
      const {
        id,
        type
      } = this.data.classic
      // 发送点赞或者取消点赞请求
      like(behavior, id, type)
    },

    onPrevious: function (event) {
      this.setClassic('previous')
    },

    onNext: function (event) {
      this.setClassic('next')
    },

    setClassic: async function (type) {
      const res = await getClassic(this.data.classic.index, type)
      const {
        fav_nums,
        like_status,
        index
      } = res;
      this.setData({
        classic: res,
        likeCount: fav_nums,
        likeStatus: like_status,
        latest: this.isLatest(index),
        first: this.isFirst(index)
      })
    },

    isFirst(index) {
      return index == 1 ? true : false
    },

    isLatest(index) {
      const latestIndex = wx.getStorageSync('latest')
      return latestIndex == index ? true : false
    }
  }
})