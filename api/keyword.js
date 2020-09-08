import { api } from '../utils/http.js'

const key = 'kw';
const maxLength = 10;

const getHot = () => {
  return api.request({
    url: 'book/hot_keyword'
  })
}

const getHistory = () => {
  const words = wx.getStorageSync(key) || []

  return words
}

const addToHistory = (keyword) => {
  let words = getHistory();
  const hasWord = words.includes(keyword)

  if (!hasWord) {
    if (words.length > maxLength) {
      words.pop()
    }
    words.unshift(keyword)
    wx.setStorageSync(key, words)
  }

}
export { getHot, getHistory, addToHistory }