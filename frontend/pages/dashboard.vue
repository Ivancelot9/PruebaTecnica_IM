<!-- ========================================
@file       dashboard.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Pages
@purpose    Página principal del usuario autenticado
@description
  - Protegida por middleware de autenticación
  - Usa Navigation como header global
  - Integra TaskForm y TaskBoard 
  - Siempre carga tareas desde la BD al entrar
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

      <!-- Guía rápida -->
      <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow">
        <p class="font-semibold">👋 Guía rápida:</p>
        <ul class="list-disc list-inside text-sm mt-2 space-y-1">
          <li>✍️ Usa el formulario para <strong>crear nuevas tareas</strong>.</li>
          <li>📌 Organiza tus tareas en el tablero estilo </li>
          <li>✅ Arrastra y suelta para cambiar de estado (Pendiente → En Progreso → Terminada).</li>
          <li>🗑️ Haz clic en <strong>Eliminar</strong> si ya no la necesitas.</li>
        </ul>
      </div>

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
import { useTasksStore } from '~/stores/tasks'
import { ref, onMounted } from 'vue'

// Componentes
import Navigation from '~/components/Navigation.vue'
import TaskForm from '~/components/TaskForm.vue'
import TaskBoard from '~/components/TaskBoard.vue'

const authStore = useAuthStore()
const tasksStore = useTasksStore()
const taskToEdit = ref(null)

// 🔄 Restaurar usuario y traer tareas desde la BD
onMounted(() => {
  if (authStore.token && !authStore.user) {
    authStore.me()
  }

  // 🚀 Siempre traer las tareas al entrar al dashboard
  tasksStore.fetchTasks()
})
</script>
