import { api } from '../utils/http.js'

const getHotList = () => {
  return api.request({
    url: 'book/hot_list'
  })
}

const getMyBookCount = () => {
  return api.request({
    url: '/book/favor/count'
  })
}

const getDetail = (id) => {
  return api.request({
    url: `book/${id}/detail`
  })
}

const getLikeStatus = (id) => {
  return api.request({
    url: `book/${id}/favor`
  })
}

const getComments = (id) => {
  return api.request({
    url: `book/${id}/short_comment`
  })
}

export { getHotList, getMyBookCount, getDetail, getLikeStatus, getComments }