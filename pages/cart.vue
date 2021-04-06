<template>
  <main class="py-8 max-w-7xl mx-auto px-4 lg:px-8 w-full">
    <app-cart-steps />

    <section v-if="cartUIStatus === 'idle'">
      <app-cart-display />
    </section>

    <section v-else-if="cartUIStatus === 'loading'" class="loader">
      Loading
    </section>

    <section v-else-if="cartUIStatus === 'success'" class="success">
      <h2>Success!</h2>
      <p>
        Thank you for your purchase. You'll be receiving your items in 4
        business days.
      </p>
      <p>Forgot something?</p>
      <button class="pay-with-stripe">
        <nuxt-link exact to="/">Back to Home</nuxt-link>
      </button>
    </section>

    <section v-else-if="cartUIStatus === 'failure'">
      <p>
        Oops, something went wrong. Redirecting you to your cart to try again.
      </p>
    </section>
  </main>
</template>

<script>
import AppCartSteps from '~/components/AppCartSteps.vue'
import AppCartDisplay from '~/components/AppCartDisplay.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AppCartDisplay,
    AppCartSteps,
  },
  computed: {
    ...mapState(['cartUIStatus']),
  },
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
}

.success {
  text-align: center;
}
</style>
