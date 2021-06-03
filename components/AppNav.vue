<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-y-0 justify-between h-16">
        <div class="flex">
          <nuxt-link to="/" class="flex-shrink-0 flex items-center">
            <img
              class="hidden xs:block w-36 h-auto"
              src="/logo.png"
              alt="Gyminal"
            />
            <img
              class="block xs:hidden w-10 h-auto"
              src="/logo_small.png"
              alt="Gyminal"
            />
          </nuxt-link>
          <div
            class="hidden sm:-my-px sm:ml-6 lg:flex sm:space-x-4 md:space-x-8"
          >
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
              class="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none relative"
            >
              <span class="sr-only">Shopping Cart</span>
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
              <div
                class="absolute top-0 right-[-0.3rem] w-5 h-5 rounded-full bg-lf-red text-white text-[0.6rem] flex items-center justify-center font-bold"
                v-if="cartCount > 0"
              >
                {{ cartCount }}
              </div>
            </nuxt-link>
            <div class="-mr-2 flex items-center lg:hidden">
              <!-- Mobile menu button -->
              <button
                type="button"
                @click="$emit('input', !value)"
                class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lf-red"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  :class="value ? 'hidden' : 'block'"
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
                  :class="!value ? 'hidden' : 'block'"
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
    <div v-if="value" class="lg:hidden" id="mobile-menu">
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: Boolean,
    navLinks: Array,
  },
  computed: {
    ...mapGetters(["cartCount"]),
  },
};
</script>
