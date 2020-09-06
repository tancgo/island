import { api } from '../utils/http.js'

const getHotList = () => {
  return api.request({
    url: 'book/hot_list'
  })
}

const getMyBookCount = () => {
  return this.request({
    url: '/book/favor/count'
  })
}

export { getHotList, getMyBookCount }