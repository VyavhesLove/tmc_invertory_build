<template>
  <div>
    <h2>Список ТМЦ</h2>
    <button @click="fetchItems">Обновить</button>
    <ul>
      <li v-for="it in items" :key="it.id">{{ it.id }} — {{ it.name }} ({{ it.status }})</li>
    </ul>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'

const items = ref([])
const error = ref(null)

async function fetchItems() {
  error.value = null
  try {
    const res = await api.get('/items')
    items.value = res.data
  } catch (e) {
    error.value = e?.response?.data?.detail || e.message
  }
}

fetchItems()
</script>