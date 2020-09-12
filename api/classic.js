import { api } from '../utils/http.js'

const getLatest = () => {
  return api.request({
    url: 'classic/latest'
  })
}

const getClassic = (index, type) => {
  return api.request({
    url: `classic/${index}/${type}`
  })
}

const getMyFavor = () => {
  return api.request({
    url: 'classic/favor'
  })
}

const getById = (id, type) => {
  return api.request({
    url: `classic/${type}/${id}`
  })
}

export { getLatest, getClassic, getMyFavor, getById }