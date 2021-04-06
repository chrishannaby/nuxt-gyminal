<template>
  <nav aria-label="Progress">
    <ol
      class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
    >
      <li
        v-for="(step, i) in steps"
        :key="step.name"
        class="relative md:flex-1 md:flex"
      >
        <!-- Current Step -->
        <div
          href="#"
          class="px-6 py-4 flex items-center text-sm"
          :class="step.active ? 'text-lf-red' : 'text-gray-500'"
          aria-current="step"
        >
          <span
            :class="step.active ? 'border-lf-red' : 'border-gray-300'"
            class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2  rounded-full"
          >
            <span class="font-bold">{{ `0${i + 1}` }}</span>
          </span>
          <span class="ml-4 text-sm font-medium text-gray-500">{{
            step.name
          }}</span>
        </div>

        <!-- Arrow separator for lg screens and up -->
        <div
          v-if="i !== steps.length - 1"
          class="hidden md:block absolute top-0 right-0 h-full w-5"
          aria-hidden="true"
        >
          <svg
            class="h-full w-full text-gray-300"
            viewBox="0 0 22 80"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 -2L20 40L0 82"
              vector-effect="non-scaling-stroke"
              stroke="currentcolor"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['cartUIStatus']),
    ...mapGetters(['cartCount']),
    steps() {
      if (this.cartUIStatus === 'idle' && this.cartCount === 0) {
        return [
          { name: 'Shopping Cart', active: true },
          { name: 'Check Out' },
          { name: 'Order Complete' },
        ]
      }
      if (this.cartUIStatus === 'idle' && this.cartCount > 0) {
        return [
          { name: 'Shopping Cart' },
          { name: 'Check Out', active: true },
          { name: 'Order Complete' },
        ]
      }
      if (this.cartUIStatus === 'success') {
        return [
          { name: 'Shopping Cart' },
          { name: 'Check Out' },
          { name: 'Order Complete', active: true },
        ]
      }
    },
  },
}
</script>
