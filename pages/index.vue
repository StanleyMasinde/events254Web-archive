<template>
  <div>
    <!-- header/Hero -->
    <section class="bg-slate-500 h-64 mb-7 relative border-b-2">
      <img src="/hero.svg" alt="Hero" class="absolute w-full h-full object-top object-cover" />
      <div class="absolute w-full bottom-0 px-4 sm:px-16 -mb-6">
        <search-component />
      </div>
    </section>
    <!-- Header/hero -->


    <!--Categories-->
    <!--/Categories---->

    <!-- Events -->
    <section class="mt-16 sm:px-16">
      <!-- Event types -->
      <div v-for="(s, i) in data" :key="i" class="mb-5">
        <div v-if="s.data.length > 0" class="flex justify-between px-2">
          <h1 class="font-bold text-xl">{{ s.name }}</h1>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <div v-if="s.data.length > 0"
          class="flex overflow-y-hidden ml-2 first:ml-0 sm:ml-0 rounded-lg snap-mandatory snap-x">
          <div class="mr-2 last:mr-0 rounded-lg snap-center" v-for="(e, i) in s.data" :key="i">
            <div class="min-w-[79vw] md:min-w-[35vw] rounded-lg border-2 border-gray-100">
              <nuxt-link :to="`/${e.linkPrefix}/${e.id}`">
                <img class="h-44 w-full rounded-lg" :src="e.image || '/hero.svg'" alt="Event" />
              </nuxt-link>
            </div>

            <div class="flex justify-end -mt-5 mr-2">
              <div>
                <button class="bg-primary text-white rounded-full p-2 border-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              <div>
                <button class="bg-primary text-white rounded-full p-2 border-2 border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h1 class=" font-bold">{{ moment(e.startDate).format('dddd Do MMMM') }}</h1>
              <h1 class=" text-xl font-bold">{{ e.name }}</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Event Types -->
    </section>
    <!-- Events -->
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment-timezone'

const { $events254Api } = useNuxtApp()
const { data, pending, refresh, error } = await useAsyncData('feed', async () => {
  const res = await $events254Api.newsfeed()
  return res.data
}, { initialCache: false })
</script>
