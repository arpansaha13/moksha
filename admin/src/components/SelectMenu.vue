<template>
  <Listbox as="div" class="text-sm" v-model="selected">
    <ListboxLabel class="block font-medium text-gray-700">{{ label }}</ListboxLabel>

    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <span class="block truncate">{{ selected.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ListboxOption
            as="template"
            v-for="item in items"
            :key="item.slug"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.name }}</span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { type PropType, ref, watch, toRef } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import type { SelectMenuItem } from '~/types'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<SelectMenuItem[]>,
    required: true,
  },
  modelValue: {
    type: Object as PropType<SelectMenuItem>,
    required: true,
  },
})

const emit = defineEmits(['update:model-value'])

const selected = ref(props.modelValue)
const modelValue = toRef(props, 'modelValue')
const modelValueUpdated = ref(false)
const selectedUpdated = ref(false)

watch(selected, newVal => {
  // Stop the cyclic dependency
  if (modelValueUpdated.value) modelValueUpdated.value = false
  else {
    selectedUpdated.value = true
    emit('update:model-value', newVal)
  }
})

watch(modelValue, newVal => {
  if (selectedUpdated.value) {
    selectedUpdated.value = false
  } else {
    modelValueUpdated.value = true
    selected.value = newVal
  }
})
</script>
