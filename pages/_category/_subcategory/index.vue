<template>
  <main
    class="py-8 px-4 lg:px-8 grid gap-8 grid-rows-[auto,1fr] grid-cols-1 lg:grid-cols-[16rem,1fr]"
  >
    <div class="pr-4 text-sm text-gray-600 space-y-6">
      <div class="flex items-center">
        <h2 class="text-gray-500 text-lg font-semibold mr-4">
          Filters
        </h2>
        <div class="block lg:hidden cursor-pointer">
          <svg
            v-if="filtersOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 hover:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="filtersOpen = false"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 hover:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="filtersOpen = true"
          >
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            />
          </svg>
        </div>
      </div>
      <div v-show="showFilters">
        <div class="flex flex-col">
          <p>
            Max Price
            <span class="ml-2 font-bold">{{
              pricerange > maxPrice ? maxPrice : pricerange | dollar
            }}</span>
          </p>
          <input
            class="mt-2"
            id="pricerange"
            type="range"
            v-model="pricerange"
            :min="minPrice"
            :max="maxPrice"
            step="1"
          />
          <div class="mt-2 text-xs flex justify-between">
            <p>{{ minPrice | dollar }}</p>
            <p>{{ maxPrice | dollar }}</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <p>
            Min Rating
          </p>
          <div class="mt-2 space-y-2">
            <div
              v-for="i in ratings"
              :key="i"
              class="flex items-center space-x-2"
            >
              <label :for="i"><app-star-rating :rating="i"/></label>
              <input type="radio" :id="i" :value="i" v-model="rating" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <app-crumbs :trail="trail" />
      <app-hero
        class="mt-4 -mx-4 md:mx-0"
        :title="subcategory.name"
        :image="subcategory.image"
      />
      <transition-group
        class="mt-8 grid gap-8 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        name="list"
        tag="div"
      >
        <NuxtLink
          class="transition-all duration-500 ease-in-out	"
          v-for="product of filteredProducts"
          :key="product.slug"
          :to="`/${category.slug}/${subcategory.slug}/${product.slug}`"
        >
          <app-product-card :product="product" />
        </NuxtLink>
      </transition-group>
    </div>
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
    const prices = products.map((p) => p.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const trail = [
      { name: category.name, path: `/${category.slug}` },
      { name: subcategory.name, path: `/${category.slug}/${subcategory.slug}` },
    ]
    return {
      products,
      category,
      subcategory,
      trail,
      minPrice,
      maxPrice,
    }
  },
  head() {
    return {
      title: `${this.subcategory.name} | Life Fitness`,
      meta: [{ name: 'Algolia Crawler', content: 'noindex' }],
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter((p) => {
        const aboveRating = this.rating
          ? Math.round(p.rating) >= this.rating
          : true
        return p.price <= this.pricerange && aboveRating
      })
    },
    showFilters() {
      return this.windowWidth > 1024 || this.filtersOpen
    },
  },
  data() {
    return {
      pricerange: Number.MAX_VALUE,
      rating: null,
      ratings: [5, 4, 3, 2, 1, 0],
      filtersOpen: false,
      windowWidth: null,
    }
  },
  mounted() {
    if (process.client) {
      this.windowWidth = window.innerWidth
      window.onresize = () => {
        this.windowWidth = window.innerWidth
      }
    }
  },
}
</script>

<style scoped>
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>
