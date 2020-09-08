// components/search/index.js
import { search } from '../../api/book.js'
import { getHot, getHistory, addToHistory } from '../../api/keyword.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    value: '', // 搜索框中的文字
    loading: false,
    loadingCenter: false,
    dataArray: []
  },

  async attached() {
    this.setData({
      historyWords: getHistory()
    })

    const res = await getHot()
    if (res) {
      this.setData({
        hotWords: res.hot
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      // this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    async onConfirm(event) {
      const word = event.detail.value
      this.setData({
        value: word,
        searching: true
      })
      const res = await search(0, word)
      if (res) {
        this.setData({
          dataArray: res.books
        })
        // 缓存有效关键字
        addToHistory(word)
      }
    }
  }
})
