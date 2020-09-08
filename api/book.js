import { api } from '../utils/http.js'

const getHotList = () => {
  return api.request({
    url: 'book/hot_list'
  })
}

const search = (start, value) => {
  return api.request({
    url: 'book/search?summary=1',
    data: {
      q: value,
      start: start
    }
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

const postComment = (id, comment) => {
  return api.request({
    url: 'book/add/short_comment',
    method: 'POST',
    data: {
      book_id: id,
      content: comment
    }
  })
}

export { getHotList, getMyBookCount, getDetail, getLikeStatus, getComments, postComment, search }