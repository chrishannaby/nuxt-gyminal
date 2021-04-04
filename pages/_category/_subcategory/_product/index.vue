<template>
  <div>{{ product.name }}</div>
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
