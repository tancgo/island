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
      const { value } = this.data
      if (!value || this.isLocked()) return;
      // const start = dataArray.length
      const start = this.getCurrentStart()

      if (this.hasMore()) {
        // loading为锁的效果 避免重复请求
        this.locked()
        const res = await search(start, value)
        this.setMoreData(res.books)
        this.unLocked()
      }
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
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this.closeResult()
    },

    async onConfirm(event) {
      const word = event.detail.value || event.detail.text
      this.showResult()
      this.showLoadingCenter()
      this.setData({
        value: word
      })
      const res = await search(0, word)
      if (res) {
        // this.setData({
        //   dataArray: res.books
        // })
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.hideLoadingCenter()
        // 缓存有效关键字
        addToHistory(word)
      }
    },

    // 组件中的onReachBottom方法不会触发 需要触发page 页面中的onReachBottom
    // onReachBottom() {
    //   console.log('onReachBottom search')
    // }
    showResult() {
      this.setData({
        searching: true
      })
    },

    closeResult() {
      this.setData({
        searching: false,
        value: ''
      })
    },

    showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

  }
})