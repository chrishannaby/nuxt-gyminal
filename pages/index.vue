<template>
  <div>
    <div class="w-screen h-96 grid grid-rows-1 grid-cols-1 place-items-center">
      <video
        class="row-start-1 col-start-1 w-full h-96 object-cover"
        src="https://res.cloudinary.com/chrishannaby/video/upload/v1617666988/lifefitness/hype_d4ozex.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <div
        class="z-10 row-start-1 col-start-1 w-full flex flex-col items-center space-y-8"
      >
        <div>
          <h1 class="text-4xl font-black text-white text-center">
            Gyminal Instructors
          </h1>
        </div>
        <button
          class="bg-lf-red uppercase tracking-wide text-xs text-white font-extrabold py-4 px-16"
        >
          Learn More
        </button>
      </div>
    </div>
    <main class="pt-12 max-w-7xl mx-auto px-4 lg:px-8 w-full">
      <app-top-sellers :products="featuredProducts" />
    </main>
    <app-testimonial class="mt-16" />
    <app-top-categories
      class="w-screen pt-20 pb-12 bg-white"
      :categories="categories"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const categories = await $content("categories", params.category).fetch();
    const featuredProducts = await $content("products")
      .where({ featured: true })
      .limit(4)
      .fetch();
    console.log(featuredProducts);
    return {
      categories,
      featuredProducts,
    };
  },
  head() {
    return {};
  },
};
</script>
