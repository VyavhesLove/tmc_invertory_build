// Pinia — это state management (вроде Vuex, но проще). Store хранит токен, методы login/logout и умеет вызывать API.

import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async login(username, password) {
      // FastAPI ожидает application/x-www-form-urlencoded для OAuth2PasswordRequestForm
      const body = new URLSearchParams()
      body.append('username', username)
      body.append('password', password)

      const res = await api.post('/auth/login', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      this.token = res.data.access_token
      localStorage.setItem('token', this.token)
      // После установки токена, interceptor автоматически подставит его в следующие запросы
      return res.data
    },

    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})