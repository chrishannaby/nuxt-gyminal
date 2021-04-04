<template>
  <div>
    {{ category.name }}
    <li v-for="subcategory of subcategories" :key="subcategory.slug">
      <NuxtLink :to="`/${category.slug}/${subcategory.slug}`">{{
        subcategory.name
      }}</NuxtLink>
    </li>
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
