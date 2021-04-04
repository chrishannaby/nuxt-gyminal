<template>
  <div id="search"></div>
</template>

<script>
export default {
  mounted() {
    window.algoliasearchNetlify({
      appId: 'Y6LCYCAFF7',
      apiKey: 'adc8935d930d2ee729611512bc8cb121',
      siteId: '5399d496-ae20-4464-a39b-98c619756b84',
      branch: 'main',
      selector: 'div#search',
    })
  },
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
}
</script>
