<template>
  <div
    class="h-full transition-transform	duration-200	 hover:transform hover:-translate-y-2 "
  >
    <div class="bg-white h-52">
      <img
        :src="product.image"
        class="p-4 h-52 w-full object-scale-down object-center"
      />
    </div>
    <div class="">
      <p class="mt-4 text-sm font-semibold">
        {{ product.name }}
      </p>
      <p class="mt-1 text-sm">
        {{ product.price | dollar }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
}
</script>
