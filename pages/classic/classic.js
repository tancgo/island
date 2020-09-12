import { getLatest, getClassic, getById } from '../../api/classic.js'
import { like, getLikeStatus } from '../../api/like.js'

// const classic = new ClassicModel();

Component({

  /**
   * 页面的初始数据
   */
  properties: {
    cid: Number,
    type: Number
  },
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
  lifetimes: {
    attached: async function (options) {
      const { cid, type } = this.properties
      console.log(cid, type, this.properties, 'attached');

      let res;
      if (!cid) {
        res = await getLatest();
      } else {
        res = await getById(cid, type)
      }


      if (res && res.fav_nums) {
        const { fav_nums, like_status, index } = res;
        // 存贮最新的index值
        wx.setStorageSync('latest', index)
        // 数据写入缓存
        wx.setStorageSync(this.getKey(index), res)
        this.setData({
          classic: res,
          likeCount: fav_nums,
          likeStatus: like_status
        })
      }
    }
  },

  methods: {
    onLike: function (event) {
      console.log(event.detail);

      const behavior = event.detail.behavior
      const { id, type } = this.data.classic
      // 发送点赞或者取消点赞请求
      like(behavior, id, type)
    },

    onPrevious: function (event) {
      this.setClassic('previous')
    },

    onNext: function (event) {
      this.setClassic('next')
    },

    setClassic: async function (action) {
      const { index: classicIndex } = this.data.classic
      const key = action === 'next' ? this.getKey(classicIndex + 1) : this.getKey(classicIndex - 1)
      // 缓存中寻找
      const classic = wx.getStorageSync(key)

      console.log(classic, 'isClassic');
      // 存在时从缓存中取数据，不存在时请求接口数据
      const res = !classic ? await getClassic(classicIndex, action) : wx.getStorageSync(key)
      const { fav_nums, like_status, index, id, type } = res

      // 获取like组件的点赞状态和数量
      this._getLikeStatus(id, type)

      // 缓存中不存在时则写入
      if (!classic) wx.setStorageSync(this.getKey(index), res)

      this.setData({
        classic: res,
        // likeCount: fav_nums,
        // likeStatus: like_status,
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
    },

    getKey(index) {
      const key = 'classic-' + index
      return key
    },

    async _getLikeStatus(artID, category) {
      const res = await getLikeStatus(artID, category)

      if (res) {
        const { fav_nums, like_status } = res

        this.setData({
          likeCount: fav_nums,
          likeStatus: like_status
        })
      }
    }

  }
})