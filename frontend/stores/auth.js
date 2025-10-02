// ========================================
// @file       auth.js
// @project    To-Do App (Prueba Técnica)
// @module     Frontend - Store de Autenticación
// @purpose    Manejo centralizado del estado de usuario
// @description
//   - Guarda información del usuario autenticado
//   - Maneja login, registro y logout
//   - Almacena token JWT para peticiones seguras
//   - Conecta con el backend vía Axios
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
        console.log("👉 Login API:", `${config.public.apiBaseUrl}/auth/login`)

        const { data } = await axios.post(`${config.public.apiBaseUrl}/auth/login`, { email, password })
        this.user = data.user
        this.token = data.token

        // Guardar token en localStorage
        localStorage.setItem("token", data.token)
        return true
      } catch (err) {
        this.error = err.response?.data?.message || "Correo o contraseña inválidos"
        console.error("❌ Error login:", this.error)
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
        console.log("👉 Register API:", `${config.public.apiBaseUrl}/auth/register`)

        const { data } = await axios.post(`${config.public.apiBaseUrl}/auth/register`, { name, email, password })
        this.user = data.user
        this.token = data.token

        // Guardar token en localStorage
        localStorage.setItem("token", data.token)
        return true
      } catch (err) {
        this.error = err.response?.data?.message || "Este usuario ya está registrado"
        console.error("❌ Error registro:", this.error)
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem("token")
    }
  }
})
