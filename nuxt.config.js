import fs from 'fs'
import path from 'path'

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'
      }
    ]
  },
  components: true,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [`~/plugins/currency-filter.js`],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content'
  ],
  content: {
    // Options
  },
  /*
   ** Build configuration
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image'
  ],

  hooks: {
    build: {
      async done(builder) {
        console.log(builder.nuxt.options.rootDir)
        const extraFilePath = path.join(
          builder.nuxt.options.rootDir,
          'functions',
          'create-payment-intent',
          'data.json'
        )
        const { $content } = require('@nuxt/content')
        const files = await $content('products').fetch()
        fs.writeFileSync(extraFilePath, JSON.stringify(files))
      }
    }
  },
  googleFonts: {
    families: {
      Inter: {
        wght: [100 + '..' + 900]
      }
    }
  },
  tailwindcss: {
    jit: true
  },
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  }
}
