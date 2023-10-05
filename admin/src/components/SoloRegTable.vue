<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle px-1">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <caption class="sr-only">
              Table for displaying the data of user registrations for the selected category of contest.
            </caption>

            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Institution</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="user in registeredUsers" :key="user.email">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.user_id }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.institution }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.phone_no }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { User } from '~/types'

defineProps({
  registeredUsers: {
    type: Array as PropType<User[]>,
    required: true,
  },
})
</script>
