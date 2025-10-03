//api-client = заранее настроенный экземпляр axios, где указан baseURL, и куда удобно подставлять заголовок Authorization. Создаём единый экземпляр и импортируем его в сторы/компоненты.

import axios from 'axios'

// Относительный базовый URL — /api — потому что nginx будет проксировать /api -> backend.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Интерцептор: если в localStorage есть токен — подставим
// Плюс: при логине мы явно запишем токен в localStorage и в store.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api