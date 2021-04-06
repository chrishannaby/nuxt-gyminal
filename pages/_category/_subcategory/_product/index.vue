<template>
  <main class="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full">
    <h1>{{ product.name }}</h1>
    <img class="h-64 w-full object-contain" :src="product.image" />
    <p>${{ product.price }}</p>
    <button @click="addToCart">Add to cart</button>
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
  methods: {
    addToCart() {
      const item = {
        ...this.product,
        quantity: 1,
      }
      console.log(item)
      this.$store.commit('addToCart', { ...item })
    },
  },
  head() {
    return {
      title: `${this.product.name} | Life Fitness`,
    }
  },
}
</script>

<style></style>
