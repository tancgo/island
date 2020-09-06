import { api } from '../utils/http.js'

const getLatest = () => {
  return api.request({
    url: 'classic/latest'
  })
}

const getClassic = (index, type) => {
  return api.request({
    url:`classic/${index}/${type}`
  })
}

export { getLatest, getClassic }