<template>
  <div class="border-t border-gray-300">
    <div
      class=" flex space-x-4 justify-between py-4 border-b border-gray-300"
      v-for="item in cart"
      :key="item.id"
    >
      <div class="flex">
        <img
          :src="item.image"
          :alt="item.name"
          class="h-20 xs:h-36 p-2 xs:p-4 mr-8"
        />
        <div class="max-w-[16rem]">
          <h3 class="text-sm">{{ item.name }}</h3>
          <button
            :disabled="item.quantity === 1"
            @click="removeOneFromCart(item)"
            class="quantity-adjust"
          >
            -
          </button>
          <strong> {{ item.quantity }}</strong>
          <button @click="addToCart(item)" class="quantity-adjust">+</button>
        </div>
      </div>
      <div clas="">
        <div class="font-semibold">
          {{ (item.quantity * item.price) | dollar }}
        </div>
        <button
          @click="removeAllFromCart(item)"
          class="w-full mt-2 text-sm hover:underline text-right"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
  },
  methods: {
    addToCart(item) {
      this.$store.commit('addToCart', item)
    },
    removeOneFromCart(item) {
      this.$store.commit('removeOneFromCart', item)
    },
    removeAllFromCart(item) {
      this.$store.commit('removeAllFromCart', item)
    },
  },
}
</script>
