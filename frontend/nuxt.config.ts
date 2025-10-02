// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      // @ts-ignore
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001'
    }
  }
})
