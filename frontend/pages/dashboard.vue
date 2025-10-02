<!-- ========================================
@file       dashboard.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Pages
@purpose    Página principal del usuario autenticado
@description
  - Protegida por middleware de autenticación
  - Usa Navigation como header global
  - Integra TaskForm (crear tarea) y TaskBoard (estilo Trello)
======================================== -->

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Barra de navegación -->
    <Navigation />

    <main class="max-w-7xl mx-auto p-6 space-y-6">
      <!-- Bienvenida -->
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Bienvenido, {{ authStore.user?.name || "Usuario" }}
      </h2>

      <!-- Formulario para crear/editar tareas -->
      <TaskForm :task-to-edit="taskToEdit" />

      <!-- Tablero estilo Trello -->
      <TaskBoard @edit="taskToEdit = $event" />
    </main>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

import { useAuthStore } from '~/stores/auth'
import { ref, onMounted } from 'vue'

// Componentes
import Navigation from '~/components/Navigation.vue'
import TaskForm from '~/components/TaskForm.vue'
import TaskBoard from '~/components/TaskBoard.vue'

const authStore = useAuthStore()
const taskToEdit = ref(null)

// 🔄 Restaurar usuario si hay token
onMounted(() => {
  if (authStore.token && !authStore.user) {
    authStore.me()
  }
})
</script>
