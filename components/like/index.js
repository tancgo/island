// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      if (this.properties.readOnly) {
        return
      }
      let {
        like,
        count
      } = this.properties;

      count = like ? count - 1 : count + 1;

      this.setData({
        like: !like,
        count
      })
      // 激活事件
      const behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})