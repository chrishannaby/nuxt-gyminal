<template>
  <div class="space-y-4">
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700"
        >Phone Number</label
      >
      <div class="mt-1">
        <input
          v-model="stripePhone"
          type="text"
          name="phone"
          id="phone"
          class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md"
          placeholder="+1 (123) 123-1234"
        />
      </div>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <div class="mt-1">
        <input
          v-model="stripeEmail"
          type="text"
          name="email"
          id="email"
          class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md"
          placeholder="you@example.com"
        />
      </div>
    </div>
    <div>
      <label for="card" class="block text-sm font-medium text-gray-700"
        >Credit Card</label
      >
      <card
        class="mt-1 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border border-gray-300 rounded-md"
        id="card"
        :class="{ complete }"
        stripe="pk_test_51IcZXsCCsPf73fDLjjEL8wBWWEO7dei56cyV3hORf8ne1i8tg2aDpemaDCxV9CVXM9O4UFXmUNMSMLK5lmjyg1lJ00byxBS7uz"
        :options="stripeOptions"
        @change="complete = $event.complete"
      />
    </div>
    <small class="card-error">{{ error }}</small>
    <button
      class="w-full bg-lf-red text-white font-medium py-4"
      :class="payDisabled ? 'cursor-not-allowed bg-opacity-20' : ''"
      @click="pay"
      :disabled="payDisabled"
    >
      Pay with credit card
    </button>
  </div>
</template>

<script>
import { Card, handleCardPayment } from 'vue-stripe-elements-plus'

import { mapState } from 'vuex'

export default {
  components: { Card },
  computed: {
    ...mapState(['cartUIStatus']),
    payDisabled() {
      return !this.complete || !this.stripeEmail || this.loading
    },
  },
  mounted() {
    // create a PaymentIntent on Stripe with order information
    this.$store.dispatch('createPaymentIntent')
  },
  data() {
    return {
      complete: false,
      stripeOptions: {
        style: {
          base: {
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            color: '#555',
            '::placeholder': {
              color: '#909090',
            },
          },
          invalid: {
            iconColor: 'rgb(132, 53, 52)',
            color: '#555',
          },
        },
      },
      stripeEmail: '',
      stripePhone: '',
      error: '',
      loading: false,
    }
  },
  methods: {
    pay() {
      // confirms the payment and will automatically display a
      // pop-up modal if the purchase requires authentication
      this.loading = true
      const customerDetails = {
        shipping: {
          address: { line1: '' },
          name: '',
        },
        receipt_email: this.stripeEmail,
      }
      if (this.stripePhone) {
        customerDetails.shipping.phone = this.stripePhone
      }
      handleCardPayment(this.$store.getters.clientSecret, customerDetails).then(
        (result) => {
          this.loading = false
          if (result.error) {
            // show the error to the customer, let them try to pay again
            this.error = result.error.message
            setTimeout(() => (this.error = ''), 3000)
          } else if (
            result.paymentIntent &&
            result.paymentIntent.status === 'succeeded'
          ) {
            // payment succeeded! show a success message
            // there's always a chance your customer closes the browser after the payment process and before this code runs so
            // we will use the webhook in handle-payment-succeeded for any business-critical post-payment actions
            this.$store.commit('orderCompleted')
          } else {
            this.error = 'Some unknown error occured'
            setTimeout(() => (this.error = ''), 3000)
          }
        }
      )
    },
  },
}
</script>
