import { api } from '../utils/http.js'

const getLatest = () => {
  return api.request({
    url: 'classic/latest'
  })
}

export { getLatest }