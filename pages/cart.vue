<template>
  <main class="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full space-y-8">
    <app-cart-steps />

    <section v-if="cartUIStatus === 'empty'">
      <app-cart-empty />
    </section>

    <section
      v-if="cartUIStatus === 'idle'"
      class="grid gap-8 grid-cols-1 lg:grid-cols-[1fr,auto]"
    >
      <app-cart-display class="flex-1" />
      <div>
        <app-cart-summary />
        <button
          @click="startCheckout"
          class="mt-4 w-full bg-lf-red text-white text-sm font-medium py-4"
        >
          Checkout
        </button>
      </div>
    </section>

    <section
      v-if="cartUIStatus === 'checkout'"
      class="flex space-y-4 md:space-x-8 md:items-start flex-col md:flex-row "
    >
      <app-stripe class="flex-1" />
      <app-cart-summary />
    </section>

    <section v-else-if="cartUIStatus === 'completed'">
      <app-cart-complete />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cartUIStatus']),
  },
  methods: {
    startCheckout() {
      this.$store.commit('startCheckout')
    },
  },
  head() {
    return {
      title: 'Cart | Life Fitness',
      script: [{ src: 'https://js.stripe.com/v3/' }],
    }
  },
}
</script>
