<template>
  <div>
    <head class="grid grid-cols-1 grid-rows-1 place-items-center">
      <img
        :src="category.image"
        class="row-start-1 col-start-1 h-80 w-full object-cover"
      />
      <div
        class="w-full h-full bg-black bg-opacity-50 row-start-1 col-start-1 text-6xl font-black text-white grid place-items-center"
      >
        <h1>{{ category.name }}</h1>
      </div>
    </head>
    <h2 class="mt-8 text-2xl font-semibold">Shop by category</h2>
    <ul class="grid grid-cols-3 mt-4">
      <li v-for="subcategory of subcategories" :key="subcategory.slug">
        <NuxtLink :to="`/${category.slug}/${subcategory.slug}`">{{
          subcategory.name
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let subcategories, category
    try {
      category = await $content('categories', params.category).fetch()
      subcategories = await $content('subcategories')
        .where({ category: params.category })
        .fetch()
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }

    return {
      subcategories,
      category,
    }
  },
  head() {
    return {
      title: `${this.category.name} | Life Fitness`,
    }
  },
}
</script>

<style></style>
