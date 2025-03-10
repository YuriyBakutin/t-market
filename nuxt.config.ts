// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  devServer: {
    port: process.env.NITRO_PORT ? +process.env.NITRO_PORT : 4012,
  },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  routeRules: {
    '/': { redirect: '/catalog/all' },
    '/catalog': { redirect: '/catalog/all' },
  },

  css: ['@/assets/scss/vuetify.scss'],

  imports: {
    dirs: ['types'],
  },
})
