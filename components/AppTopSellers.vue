<template>
  <div class="flex flex-col items-center">
    <h2 class="text-gray-900 text-2xl font-black uppercase text-center">
      Top Sellers. Something for everyone.
    </h2>
    <h3 class="text-sm mt-2 text-gray-700 text-center">
      Explore our Top Sellers in Cardio Equipment.
    </h3>
    <div
      class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-8 items-stretch"
    >
      <nuxt-link
        :to="`/products/${product.slug}`"
        v-for="product in products"
        :key="product.id"
      >
        <div
          class="bg-white h-full p-4 transition-transform duration-200	hover:transform hover:-translate-y-2"
        >
          <img
            :src="product.image"
            class="p-4 h-52 w-full object-scale-down object-center"
          />
          <div class="px-4">
            <p
              class="mt-2 pt-2 border-t-2 border-lf-red text-sm uppercase font-semibold tracking-wide"
            >
              {{ product.name }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  mounted() {
    console.log({ products: this.products })
  },
}
</script>
