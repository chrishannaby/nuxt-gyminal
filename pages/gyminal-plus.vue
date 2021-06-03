<template>
  <main
    class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,2fr] items-center"
  >
    <div class="flex flex-col px-12 lg:items-end">
      <h1 class="mt-16 lg:mt-0 text-3xl xs:text-4xl text-gray-800 font-bold">
        Gyminal+
      </h1>
      <p
        class="mt-2 pt-4 border-t-2 border-lf-red text-black font-light text-2xl"
      >
        $39 / month
      </p>
      <p class="my-6 space-y-3 text-sm lg:text-right">
        Immerse exercisers in digital class environments, whenever and however
        they want. Gyminal™ On Demand classes add a captivating new feature to
        our already entertainment-rich, connected Discover SE3 HD consoles.
      </p>
      <button
        class="mt-4  bg-lf-red hover:bg-red-700 text-white font-medium py-2 px-6"
        @click=""
      >
        Get Started
      </button>
    </div>
    <video
      class="p-12"
      src="https://res.cloudinary.com/chrishannaby/video/upload/v1617804191/lifefitness/app.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>
  </main>
</template>

<script>
export default {};
</script>
