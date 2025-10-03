<template>
  <div>
    <h1>TMC Inventory (frontend)</h1>
    <div v-if="!isAuthed">
      <LoginForm />
    </div>
    <div v-else>
      <button @click="logout">Выйти</button>
      <ItemsList />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import LoginForm from './components/LoginForm.vue'
import ItemsList from './components/ItemsList.vue'

const auth = useAuthStore()
const isAuthed = computed(() => !!auth.token)

function logout() {
  auth.logout()
  window.location.reload()
}
</script>