<template>
  <div
    :class="$route.name === 'cart' ? 'bg-white' : 'bg-gray-100'"
    class="min-h-screen overflow-hidden"
  >
    <app-nav v-model="menuOpen" :nav-links="navLinks" />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css',
        },
      ],
      script: [
        {
          type: 'text/javascript',
          src:
            'https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js',
        },
      ],
    }
  },
  mounted() {
    window.algoliasearchNetlify({
      appId: 'R04FAN1J2R',
      apiKey: '5d4b3b98f589d66a640b95a7f360bcfb',
      siteId: '40b1b69b-a02a-4f23-a669-418b5b94cbf2',
      branch: 'main',
      selector: 'div#search',
      placeholder: 'Search...',
      detached: true,
    })
  },
  data() {
    return {
      menuOpen: false,
      navLinks: [
        { name: 'Cardio', path: '/cardio' },
        { name: 'Strength', path: '/strength' },
        { name: 'Accessories', path: '/accessories' },
      ],
    }
  },
  computed: {
    ...mapState(['cartUIStatus']),
  },
  watch: {
    $route: function() {
      if (process.client) {
        this.menuOpen = false
        if (this.cartUIStatus === 'completed') {
          this.$store.commit('resetCart')
        }
      }
    },
  },
}
</script>
