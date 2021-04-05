<template>
  <main class="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full">
    {{ product.name }}
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    let category, subcategory, product
    try {
      subcategory = await $content('subcategories', params.subcategory).fetch()
      category = await $content('categories', subcategory.category).fetch()
      product = await $content('products', params.product).fetch()
    } catch (err) {}
    return {
      product,
      category,
      subcategory,
    }
  },
  head() {
    return {
      title: `${this.product.name} | Life Fitness`,
    }
  },
}
</script>

<style></style>
