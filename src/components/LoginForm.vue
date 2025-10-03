<template>
  <div>
    <h2>Вход</h2>
    <form @submit.prevent="doLogin">
      <div><input v-model="username" placeholder="username" /></div>
      <div><input v-model="password" type="password" placeholder="password" /></div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref(null)
const auth = useAuthStore()

async function doLogin() {
  error.value = null
  try {
    await auth.login(username.value, password.value)
    // после успешного логина можно, например, перезагрузить страницу или показать другой компонент
    window.location.reload()
  } catch (e) {
    error.value = e?.response?.data?.detail || e.message || 'Ошибка входа'
  }
}
</script>