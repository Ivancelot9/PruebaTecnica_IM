// ========================================
// @file       tasks.js
// @project    To-Do App (Prueba Técnica)
// @module     Frontend - Store de Tareas
// @purpose    Gestión del estado y CRUD de tareas
// @description
//   - Almacena todas las tareas del usuario
//   - Ejecuta operaciones CRUD contra el backend
//   - Aplica filtros de categoría, estado y búsqueda
//   - Protege llamadas con token JWT (authStore)
// ========================================

import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],       // Lista de tareas
    loading: false,  // Estado de carga
    error: null      // Mensajes de error
  }),
  actions: {
    async fetchTasks(filters = {}) {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const { data } = await axios.get('http://localhost:3001/tasks', {
          params: filters,
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.tasks = data
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al obtener tareas'
      } finally {
        this.loading = false
      }
    },
    async addTask(task) {
      try {
        const authStore = useAuthStore()
        const { data } = await axios.post('http://localhost:3001/tasks', task, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.tasks.push(data)
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al agregar tarea'
      }
    },
    async updateTask(id, updates) {
      try {
        const authStore = useAuthStore()
        const { data } = await axios.put(`http://localhost:3001/tasks/${id}`, updates, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) this.tasks[index] = data
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al actualizar tarea'
      }
    },
    async deleteTask(id) {
      try {
        const authStore = useAuthStore()
        await axios.delete(`http://localhost:3001/tasks/${id}`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al eliminar tarea'
      }
    }
  }
})
