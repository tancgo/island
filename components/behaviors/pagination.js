const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData(dataArray) {
      this.setData({
        dataArray: this.data.dataArray.concat(dataArray)
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }
      return true
    },
  }
})

export default paginationBev