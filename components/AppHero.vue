<template>
  <head class="grid grid-cols-1 grid-rows-1 place-items-center">
    <img
      :src="image"
      class="row-start-1 col-start-1 h-80 w-full object-cover"
    />
    <div
      class="w-full h-full bg-black bg-opacity-50 row-start-1 col-start-1 text-6xl font-black text-white grid place-items-center"
    >
      <h1>{{ title }}</h1>
    </div>
  </head>
</template>

<script>
export default {
  props: {
    title: String,
    image: String,
  },
}
</script>
