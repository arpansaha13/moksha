<template>
  <div v-if="!passwordMatched" class="w-screen h-screen flex flex-col items-center justify-center gap-6">
    <img src="/moksha/moksha-192x192.png" alt="Moksha Logo" class="block mr-2 w-16 h-16" />

    <h1 class="text-2xl font-bold">Moksha {{ CURRENT_YEAR }} Admin Client</h1>

    <div
      class="p-4 max-w-md w-full mx-auto bg-gray-50 rounded-sm md:rounded-lg shadow ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <form class="w-full text-sm" @submit="verifyPassword">
        <label class="mb-1 block font-medium text-gray-700">Password</label>
        <input type="password" class="w-full py-1.5 rounded" v-model="password" />
        <p v-if="error !== null" class="mt-1 text-xs text-red-500 font-medium">{{ error }}</p>

        <div class="mt-4">
          <BaseButton type="submit"> Submit </BaseButton>
        </div>
      </form>
    </div>
  </div>

  <div v-else>
    <header class="px-6 py-3 flex items-center bg-gray-50 shadow">
      <img src="/moksha/moksha-192x192.png" alt="Moksha Logo" class="block mr-2 w-10 h-10" />

      <p class="font-bold">Moksha {{ CURRENT_YEAR }} Admin Client</p>
    </header>

    <main class="max-w-6xl mx-auto px-2 sm:px-0 py-6 space-y-6 min-h-[calc(100vh-128px)]">
      <form class="px-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" @submit="search">
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <SelectMenu
            class="w-52 sm:w-40"
            label="Club"
            :items="clubs"
            :model-value="selectedClub"
            @update:model-value="newVal => (selectedClub = newVal)"
          />
          <SelectMenu
            class="w-52 sm:w-40"
            label="Contest type"
            :items="contestTypes"
            :model-value="selectedContestType"
            @update:model-value="newVal => (selectedContestType = newVal)"
          />
          <div class="w-52">
            <SelectMenu
              v-if="typeof selectedContest !== 'undefined'"
              class="w-full"
              label="Contest name"
              :items="selectedClubContests"
              :model-value="selectedContest"
              @update:model-value="newVal => (selectedContest = newVal)"
            />
            <p v-else class="w-full h-full text-gray-500 text-sm flex items-center font-medium">
              <span>No contests found for this category</span>
            </p>
          </div>
        </div>

        <div>
          <BaseButton type="submit" :disabled="typeof selectedContest === 'undefined'" :loading="searching">
            Search
          </BaseButton>
        </div>
      </form>

      <div
        v-if="registrationData.length === 0"
        class="min-w-full h-40 flex items-center justify-center bg-gray-50 rounded-sm md:rounded-lg shadow ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <span v-if="firstSearch" class="w-6 h-6 border-y-2 border-gray-700 rounded-full animate-spin" />
        <p v-else class="text-sm font-medium text-gray-600">No registrations found for this contest</p>
      </div>

      <div v-else>
        <SoloRegTable v-if="tableType === 'solo'" :registered-users="registrationData" />
        <TeamRegTable v-else :registered-teams="registrationData" />
      </div>
    </main>

    <footer class="p-6 flex items-center bg-gray-50 shadow">
      <p class="text-center text-xs">© {{ new Date().getFullYear() }} Moksha, NIT Agartala. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import BaseButton from '~/components/BaseButton.vue'
import SelectMenu from '~/components/SelectMenu.vue'
import SoloRegTable from '~/components/SoloRegTable.vue'
import TeamRegTable from '~/components/TeamRegTable.vue'
import { clubs, contestTypes, contests } from '~/data'
import rfetch from '~/utils/rfetch'

const CURRENT_YEAR = '2024'
const passwordMatched = ref(false)
const password = ref('')
const error = ref<string | null>(null)
const firstSearch = ref(true)
const searching = ref(false)
const selectedClub = ref(clubs[0])
const selectedContestType = ref(contestTypes[0])
const selectedClubContests = computed(() => contests[selectedClub.value.slug][selectedContestType.value.slug])
const selectedContest = ref(selectedClubContests.value[0])
const tableType = ref(contestTypes[0].slug)
const registrationData = ref([])

watch(selectedClubContests, newVal => {
  selectedContest.value = newVal[0]
})

function prepareUserList(list: any) {
  return list.map((item: any) => item.user)
}

function prepareTeamList(list: any) {
  return list.map((item: any) => ({ team: item.team, registered_members: prepareUserList(item.registered_members) }))
}

async function search(e?: Event) {
  e?.preventDefault()
  searching.value = true

  const club = selectedClub.value.slug
  const contest = selectedContest.value.slug
  const type = selectedContestType.value.slug

  const url = `contests/${club}/${contest}?type=${type}`

  await rfetch(url)
    .then(res => {
      tableType.value = type
      registrationData.value = type === 'solo' ? prepareUserList(res.data) : prepareTeamList(res.data)
    })
    .finally(() => {
      searching.value = false
      firstSearch.value = false
    })
}

onMounted(() => search())

function verifyPassword(e: Event) {
  e.preventDefault()

  if (password.value === import.meta.env.VITE_ADMIN_CLIENT_PASS) {
    passwordMatched.value = true
    error.value = null
  } else {
    error.value = 'Incorrect password'
  }
}
</script>
