<template>
  <div class="min-h-screen bg-white">
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-y-0 justify-between h-16">
          <div class="flex">
            <nuxt-link to="/" class="flex-shrink-0 flex items-center">
              <img
                class="hidden xs:block h-8 w-auto"
                src="/logo.png"
                alt="Life Fitness"
              />
              <img
                class="block xs:hidden h-10 w-auto"
                src="/logo_small.png"
                alt="Life Fitness"
              />
            </nuxt-link>
            <div
              class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-4 md:space-x-8"
            >
              <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <nuxt-link
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                class="border-transparent hover:border-lf-red text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {{ link.name }}
              </nuxt-link>
            </div>
          </div>
          <div class="xs:ml-6 flex items-center space-x-2">
            <div id="search"></div>
            <div class="flex items-center space-x-2">
              <nuxt-link
                to="/cart"
                class="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lf-red"
              >
                <span class="sr-only">Shopping Cart</span>
                <!-- Heroicon name: outline/bell -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </nuxt-link>
              <div class="-mr-2 flex items-center sm:hidden">
                <!-- Mobile menu button -->
                <button
                  type="button"
                  @click="menuOpen = !menuOpen"
                  class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lf-red"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    :class="menuOpen ? 'hidden' : 'block'"
                    class="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    :class="!menuOpen ? 'hidden' : 'block'"
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="menuOpen" class="sm:hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <nuxt-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-lf-red hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            {{ link.name }}
          </nuxt-link>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <nuxt />
      </main>
    </div>
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
        { name: 'Accesories', path: '/accessories' },
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
