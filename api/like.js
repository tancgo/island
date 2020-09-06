import { api } from '../utils/http.js'

// art_id: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
// type：点赞类型分为四种：100 电影 200 音乐 300 句子 400 书籍
const like = (behavior, artID, category) => {
  const url = behavior == 'like' ? 'like' : 'like/cancel'

  return api.request({
    url,
    method: 'POST',
    data: {
      art_id: artID,
      type: category
    }
  })
}

const getLikeStatus = (artID, category) => {
  return api.request({
    url: `classic/${category}/${artID}/favor`
  })
}

export { like, getLikeStatus }