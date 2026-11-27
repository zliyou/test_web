// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: {
    viewTransition: true,
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  nitro: {
    preset: "cloudflare",
    prerender: {
      autoSubfolderIndex: false
    },
    devProxy: {
      '/api': {
        target: 'http://localhost:3006/api',
        changeOrigin: true
      }
    }
  }
})
