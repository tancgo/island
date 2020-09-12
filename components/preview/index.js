// components/preview/index.js
const types = {
  100: "电影",
  200: "音乐",
  300: "句子"
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: Object
  },

  observers: {
    'classic.type': function (type) {
      if (type) {
        this.setData({
          typeText: types[type]
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      const { id, type } = this.properties.classic
      this.triggerEvent('tapping', {
        id,
        type
      })
    }

  }
})
