export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mark-board',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Firebase configuration: https://firebase.nuxtjs.org/
  firebase: {
    config: {
      apiKey: 'AIzaSyDvnz2wsiTqshQdCR8O6HPsoUNen0QKGsM',
      authDomain: 'mrkbrd-8d1b7.firebaseapp.com',
      databaseURL: 'https://mrkbrd-8d1b7-default-rtdb.firebaseio.com',
      projectId: 'mrkbrd-8d1b7',
      storageBucket: 'mrkbrd-8d1b7.appspot.com',
      messagingSenderId: '386046675634',
      appId: '1:386046675634:web:70090ae4a4523c298ed7ab',
      measurementId: 'G-EH1YCT6HH2',
    },
    services: {
      // https://firebase.nuxtjs.org/guide/options/#services
      firestore: true,
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
      },
    },
  },

  // date-fns module configuration: https://github.com/nuxt-community/date-fns-module
  dateFns: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
    format: 'MM-dd-yyyy',
  },
}
