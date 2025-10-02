<!-- ========================================
@file       Navigation.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Components
@purpose    Barra de navegación superior
@description
  - Contiene enlaces principales de la aplicación
  - Incluye botón de cierre de sesión
  - Reutilizable en diferentes páginas
======================================== -->

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">To-Do App</h1>
      <nav class="space-x-4">
        <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
        <NuxtLink to="/tasks" class="hover:underline">Tareas</NuxtLink>
        <button 
          @click="onLogout" 
          class="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md shadow">
          Cerrar sesión
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const onLogout = () => {
  authStore.logout()
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
