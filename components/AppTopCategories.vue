<template>
  <div class="flex flex-col items-center">
    <h2 class="text-gray-900 text-3xl font-black uppercase">Top Categories</h2>
    <div class="flex flex-wrap items-center justify-center">
      <nuxt-link
        v-for="category in categories"
        :to="`/${category.slug}`"
        :key="category.slug"
        class="flex-shrink-0 flex flex-col items-center p-8 transition-transform duration-200	hover:transform hover:-translate-y-2"
      >
        <img :src="category.icon" class="w-28 h-28" />
        <h3
          class="uppercase text-center font-bold text-black mt-2 text-xs tracking-wider"
        >
          {{ category.name }}
        </h3>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
}
</script>
