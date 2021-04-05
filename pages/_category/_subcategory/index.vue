<template>
  <main class="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full">
    <app-crumbs :trail="trail" />
    <app-hero
      class="mt-4 -mx-4"
      :title="subcategory.name"
      :image="subcategory.image"
    />
    <li v-for="product of products" :key="product.slug">
      <NuxtLink :to="`/${category.slug}/${subcategory.slug}/${product.slug}`">{{
        product.name
      }}</NuxtLink>
    </li>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    let category, subcategory, products
    try {
      subcategory = await $content('subcategories', params.subcategory).fetch()
      category = await $content('categories', subcategory.category).fetch()
      products = await $content('products')
        .where({ subcategory: params.subcategory })
        .fetch()
    } catch (err) {}
    const trail = [
      { name: category.name, path: `/${category.slug}` },
      { name: subcategory.name, path: `/${category.slug}/${subcategory.slug}` },
    ]
    return {
      products,
      category,
      subcategory,
      trail,
    }
  },
  head() {
    return {
      title: `${this.subcategory.name} | Life Fitness`,
    }
  },
}
</script>

<style></style>
