<template>
  <div class="min-h-screen bg-white">
    <app-nav v-model="menuOpen" :nav-links="navLinks" />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
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
      appId: 'Y6LCYCAFF7',
      apiKey: 'adc8935d930d2ee729611512bc8cb121',
      siteId: '5399d496-ae20-4464-a39b-98c619756b84',
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
  watch: {
    $route: function() {
      if (process.client) {
        this.menuOpen = false
      }
    },
  },
}
</script>
