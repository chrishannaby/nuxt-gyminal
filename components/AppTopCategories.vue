<template>
  <div class="flex flex-col items-center">
    <h2 class="text-gray-900 text-2xl font-black">Top Categories</h2>
    <div class="flex flex-wrap items-center">
      <div
        v-for="category in categories"
        :key="category.slug"
        class="flex-1 flex flex-col items-center"
      >
        <img :src="category.icon" class="w-36 h-36" />
        <h3 class="uppercase text-center">{{ category.name }}</h3>
      </div>
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
