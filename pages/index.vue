<template>
  <div>
    <div class="w-screen h-96 grid grid-rows-1 grid-cols-1 place-items-center">
      <video
        class="row-start-1 col-start-1 w-full h-96 object-cover"
        src="/hype.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <div
        class="z-10 row-start-1 col-start-1 w-full flex flex-col items-center space-y-8"
      >
        <h1 class="text-4xl font-black text-white">Life Fitness on Demand</h1>
        <button
          class="bg-white uppercase tracking-wide text-xs text-black font-black py-4 px-16"
        >
          Learn More
        </button>
      </div>
    </div>
    <main class="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full">
      <app-top-sellers />
      <app-top-categories :categories="categories" />
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const categories = await $content('categories', params.category).fetch()
    return {
      categories,
    }
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
}
</script>
