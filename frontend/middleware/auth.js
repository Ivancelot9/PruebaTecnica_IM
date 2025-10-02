// ========================================
// @file       auth.js
// @project    To-Do App (Prueba Técnica)
// @module     Frontend - Middleware de Autenticación
// ========================================

import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (process.client) {
    let token = authStore.token

    const localToken = localStorage.getItem('token')
    if (localToken && !authStore.token) {
      authStore.token = localToken
    }
    token = authStore.token || localToken

    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }

    if (token && to.path === '/login') {
      return navigateTo('/dashboard')
    }
  }
})
