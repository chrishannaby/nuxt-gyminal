<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li>
        <div>
          <nuxt-link to="/" class="text-gray-400 hover:text-gray-500">
            <svg
              class="flex-shrink-0 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
            <span class="sr-only">Home</span>
          </nuxt-link>
        </div>
      </li>

      <li v-for="link in trail" :key="link.path">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 h-5 w-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <router-link
            :to="link.path"
            class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >{{ link.name }}</router-link
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    trail: Array,
  },
}
</script>
