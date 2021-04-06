<template>
  <nuxt-link :to="path">
    <button class="w-64 bg-lf-red text-white text-sm font-medium py-4">
      <slot />
    </button>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    path: String,
  },
}
</script>
