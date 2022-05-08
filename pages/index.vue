<template>
  <div>
    <!-- header/Hero -->
    <section class="bg-slate-500 h-64 mb-7 relative">
      <img src="/hero.jpg" alt="Hero" class="absolute w-full h-full object-cover" />
      <div class="absolute w-full bottom-0 px-2 sm:px-16 -mb-7">
        <input class="form-input w-full h-14 rounded-lg" placeholder="Search for events, locations dates etc" />
      </div>
    </section>
    <!-- Header/hero -->

    <!-- Events -->
    <section class="mt-16 sm:px-16">
      <!-- Event types -->
      <div v-for="(s, i) in data" :key="i" class="mb-7">
        <div v-if="s.data.length > 0" class="flex justify-between">
          <h1 class=" font-bold text-xl">{{ s.name }}</h1>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <div v-if="s.data.length > 0" class="flex overflow-y-hidden ml-2 sm:ml-0 rounded-md snap-mandatory snap-x">
          <div
            class="h-28 min-w-[97vw] max-w-[90vw] sm:min-w-[50%] sm:max-w-[50%] gap-1 pr-1 border mr-1 rounded-md grid grid-cols-3 snap-center sm:snap-start"
            v-for="(e, i) in s.data" :key="i">
            <div class="relative">
              <div class="absolute top-0 bg-white bg-opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <img class="w-full h-full object-cover object-center rounded-md"
                :src="e.pictureUrl ? e.pictureUrl : 'https://picsum.photos/id/1/200/300'">
            </div>
            <div class="grid grid-rows-5 col-span-2">
              <div class="row-span-1">
                <p class="text-red-500 text-sm" v-if="e.linkPrefix == 'events'">{{ moment(e.startDate).calendar(null,
                    {
                      sameElse: 'MMM DD, [from] hh:mm A'
                    })
                }}</p>
                <h1 class="line-clamp-2 font-bold text-sm">{{ e.name }}</h1>
                <p class=" line-clamp-3 text-sm">{{ e.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Event Types -->
    </section>
    <!-- Events -->
  </div>
</template>

<script setup>
import moment from 'moment-timezone'

const config = useRuntimeConfig()
console.log(config);
const { data, pending, error, refresh } = await useAsyncData(
  'feed',
  () => $fetch(`${config.public.apiUrl}/feed`)
)
</script>
