import { search } from '../../api/book.js'
import { getHot, getHistory, addToHistory } from '../../api/keyword.js'
import paginationBev from '../behaviors/pagination.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: Boolean
  },

  observers: {
    'more': async function (params) {
      console.log(this.properties.more, 'observers');
      const { dataArray, value } = this.data
      if (!value) return;
      // const start = dataArray.length
      const start = this.getCurrentStart()

      const res = await search(start, value)

      // this.setData({
      //   dataArray: dataArray.concat(res.books)
      // })
      this.setMoreData(res.books)
    }
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
    loadingCenter: false
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

    onDelete(event) {
      console.log('onDelete')
      this.setData({
        searching: false,
        value: null,
        dataArray: []
      })
    },

    async onConfirm(event) {
      const word = event.detail.value || event.detail.text
      this.setData({
        value: word,
        searching: true
      })
      const res = await search(0, word)
      if (res) {
        // this.setData({
        //   dataArray: res.books
        // })
        this.setMoreData(res.books)
        this.setTotal(res.total)
        // 缓存有效关键字
        addToHistory(word)
      }
    },

    // 组件中的onReachBottom方法不会触发 需要触发page 页面中的onReachBottom
    // onReachBottom() {
    //   console.log('onReachBottom search')
    // }
    // async loadMore() {
    //   console.log('loadMore');

    // }
  }
})