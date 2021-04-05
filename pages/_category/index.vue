<template>
  <div>
    <app-crumbs :trail="trail" />
    <app-hero
      class="mt-4 -mx-4"
      :title="category.name"
      :image="category.image"
    />
    <h2 class="mt-8 text-2xl font-semibold">Shop by category</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      <NuxtLink
        v-for="subcategory of subcategories"
        :key="subcategory.slug"
        :to="`/${category.slug}/${subcategory.slug}`"
        class="flex flex-col group"
      >
        <div class="flex-shrink-0 h-60 grid grid-cols-1 grid-rows-1">
          <nuxt-img
            class="row-start-1 col-start-1 h-full object-cover"
            :src="subcategory.image"
          />
          <div
            class="row-start-1 col-start-1 h-full w-full bg-black group-hover:bg-opacity-10 bg-opacity-0"
          ></div>
        </div>
        <h3 class="flex-1 mt-2  group-hover:underline">
          {{ subcategory.name }}
        </h3>
      </NuxtLink>
    </div>
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
    const trail = [{ name: category.name, path: `/${category.slug}` }]

    return {
      subcategories,
      category,
      trail,
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
