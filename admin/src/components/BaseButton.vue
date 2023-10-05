<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto relative"
  >
    <span :class="loading && 'text-transparent'">
      <slot />
    </span>
    <span v-if="loading" class="absolute z-10 w-5 h-5 border-y-2 border-gray-50 rounded-full animate-spin" />
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
