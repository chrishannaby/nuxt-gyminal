<template>
  <div class="flex flex-col items-center">
    <h2 class="text-gray-900 text-2xl font-black">
      TOP SELLERS. SOMETHING FOR EVERYONE.
    </h2>
    <h3 class="text-sm mt-2 text-gray-700">
      Explore our Top Sellers in Cardio Equipment.
    </h3>
    <div class="mt-8 grid grid-cols-4 h-64 w-full gap-8">
      <div v-for="i in 4" :key="i">
        <div class="bg-black h-48 w-full"></div>
        <p>{{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
