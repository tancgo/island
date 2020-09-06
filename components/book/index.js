// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      console.log(this.properties.book);
      
      const { id } = this.properties.book

      wx.navigateTo({
        url: `/pages/book-detail/book-detail?id=${id}`,
      })
    }
  }
})