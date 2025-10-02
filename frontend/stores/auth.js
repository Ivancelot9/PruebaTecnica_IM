// ========================================
// @file       auth.js
// @project    To-Do App (Prueba Técnica)
// @module     Frontend - Store de Autenticación
// @purpose    Manejo centralizado del estado de usuario
// ========================================

import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const { data } = await axios.post(`${config.public.apiBaseUrl}/auth/login`, { email, password })
        this.user = data.user
        this.token = data.token

        // Guardar token
        if (process.client) {
          localStorage.setItem("token", data.token)
        }
        return true
      } catch (err) {
        this.error = err.response?.data?.message || "Correo o contraseña inválidos"
        return false
      } finally {
        this.loading = false
      }
    },

    async register(name, email, password) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const { data } = await axios.post(`${config.public.apiBaseUrl}/auth/register`, { name, email, password })
        this.user = data.user
        this.token = data.token

        if (process.client) {
          localStorage.setItem("token", data.token)
        }
        return true
      } catch (err) {
        this.error = err.response?.data?.message || "Este usuario ya está registrado"
        return false
      } finally {
        this.loading = false
      }
    },

    async me() {
      // Restaurar datos del usuario si ya hay token
      if (!this.token) return
      try {
        const config = useRuntimeConfig()
        const { data } = await axios.get(`${config.public.apiBaseUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = data
      } catch (err) {
        console.error("❌ Error al restaurar sesión:", err)
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      if (process.client) {
        localStorage.removeItem("token")
      }
    }
  }
})
