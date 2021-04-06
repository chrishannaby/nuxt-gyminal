<template>
  <div class="py-8 flex flex-col items-center">
    <div
      class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
    >
      <svg
        class="h-6 w-6 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <h2 class="mt-8 text-gray-900 font-semibold text-xl text-center">
      Order Placed
    </h2>
    <p class="mt-2 text-center">
      Thank you for your purchase. Your items with be dispatched within 2
      business days.
    </p>
    <app-button class="mt-8" path="/">Back to Store</app-button>
  </div>
</template>

<script>
export default {}
</script>
