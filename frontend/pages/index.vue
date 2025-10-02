<!-- ========================================
@file       index.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Pages
@purpose    Página inicial (landing mínima)
@description
  - Redirige automáticamente al login
======================================== -->

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <p class="text-lg animate-pulse">Redirigiendo al login...</p>
  </div>
</template>

<script setup>
// ========================================
// Configuración de redirección
// ========================================
definePageMeta({ layout: false }) // Evita layouts innecesarios

import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  router.push('/login')
})
</script>
