<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle px-1">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-sm md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <caption class="sr-only">
              Table for displaying the data of team registrations along with the respective members for the selected
              category of contest.
            </caption>

            <thead class="divide-y divide-gray-300 bg-gray-50">
              <tr>
                <th
                  scope="colgroup"
                  colspan="2"
                  class="w-max px-3 py-3.5 text-sm font-bold text-gray-900 border-r border-gray-300"
                >
                  Team
                </th>
                <th scope="colgroup" colspan="5" class="px-3 py-3.5 text-sm font-bold text-gray-900">User</th>
              </tr>
              <tr>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border-r border-gray-300"
                >
                  ID
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Institution</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
              <template v-for="data in registeredTeams">
                <tr v-for="(user, i) in data.registered_members" :key="data.team.team_id">
                  <td
                    v-if="i === 0"
                    :rowspan="data.registered_members.length"
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"
                  >
                    {{ data.team.team_name }}
                  </td>
                  <td
                    v-if="i === 0"
                    :rowspan="data.registered_members.length"
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 border-r border-gray-200"
                  >
                    {{ data.team.team_id }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ user.first_name }} {{ user.last_name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {{ user.tag }}
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
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Team, User } from '~/types'

interface RegistrationData {
  team: Team
  registered_members: User[]
}

defineProps({
  registeredTeams: {
    type: Array as PropType<RegistrationData[]>,
    required: true,
  },
})
</script>
