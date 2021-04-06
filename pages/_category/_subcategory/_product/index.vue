<template>
  <main class="py-8 max-w-7xl mx-auto px-8 w-full">
    <div
      class="mx-auto max-w-4xl flex flex-col space-y-4 md:space-x-4 md:flex-row justify-center"
    >
      <div class="flex-1 flex  items-center justify-center">
        <img class="h-64 object-contain" :src="product.image" />
      </div>
      <div class="flex-1 flex flex-col items-start">
        <h1 class="mt-8 text-3xl xs:text-4xl text-gray-800 font-bold">
          {{ product.name }}
        </h1>
        <p
          class="mt-4 pt-4 border-t-2 border-lf-red text-black font-light text-2xl"
        >
          {{ product.price | dollar }}
        </p>
        <button
          class="mt-4  bg-lf-red hover:bg-red-700 text-white font-medium py-2 px-6"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
    <NuxtContent
      class="mt-12 prose prose-sm sm:prose  mx-auto"
      :document="product"
    />
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
