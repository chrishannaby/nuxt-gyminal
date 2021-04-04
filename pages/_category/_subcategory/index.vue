<template>
  <div>
    <li v-for="product of products" :key="product.slug">
      <NuxtLink :to="`/${category.slug}/${subcategory.slug}/${product.slug}`">{{
        product.name
      }}</NuxtLink>
    </li>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    console.log(params)
    let category, subcategory, products
    try {
      subcategory = await $content('subcategories', params.subcategory).fetch()
      category = await $content('categories', subcategory.category).fetch()
      products = await $content('products')
        .where({ subcategory: params.subcategory })
        .fetch()
    } catch (err) {}
    console.log(subcategory)
    return {
      products,
      category,
      subcategory,
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
