<template>
  <section class="bg-gray-100 p-6 min-w-[26rem]">
    <h2 class="text-xl font-bold w-">Order Summary</h2>
    <div class="mt-6 space-y-4">
      <div class="flex justify-between">
        <p>
          Subtotal
        </p>
        <p>{{ cartTotal | dollar }}</p>
      </div>
      <div class="flex justify-between">
        <p>
          Shipping
        </p>
        <p>Free Shipping</p>
      </div>
      <div class="flex justify-between border-t border-b border-gray-400 py-4">
        <p>
          <strong>Total</strong>
        </p>
        <p>
          <strong>{{ cartTotal | dollar }}</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartTotal']),
  },
}
</script>
