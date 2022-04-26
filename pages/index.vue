<template>
  <!-- header/Hero -->
  <section class="bg-slate-500 h-64 mb-7 relative">

    <div class="absolute w-full bottom-0 px-2 sm:px-16 -mb-7">
      <input class="form-input w-full h-14 rounded-lg" placeholder="Search for events, locations dates etc" />
    </div>
  </section>
  <!-- Header/hero -->

  <!-- Events -->
  <section class="mt-16">
    <!-- <div v-for="(e, i) in data" :key="i" class="border rounded-md grid grid-cols-3 grid-flow-col mb-2 mx-1">
      <div class="mr-2">
        <img class=" rounded-l-md h-32 w-full" :src="e.image">
      </div>
      <div class="col-span-2">
        <h1 class="text-lg font-bold">{{ e.title }}</h1>
        <p class="line-clamp-4 text-sm">{{ e.description }}</p>
      </div>
    </div> -->

    <!-- Event types -->
    <div v-for="(s, i) in data" :key="i" class="mb-7">
      <div v-if="s.data.length > 0" class="flex justify-between mx-2">
        <h1>{{ s.name }}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      <div v-if="s.data.length > 0" class="flex overflow-y-hidden ml-2 rounded-md snap-mandatory snap-x">

        <div class="h-40 min-w-[97vw] max-w-[90vw] pr-1 rounded-md grid grid-cols-2 snap-center"
          v-for="(e, i) in s.data" :key="i">

          <div>
            <img class="w-full h-full object-cover object-center rounded-md"
              :src="e.pictureUrl ? e.pictureUrl : 'https://picsum.photos/id/1/200/300'">
          </div>
          <div class=" grid grid-rows-5">
            <div>
              <h1 class="line-clamp-2 font-bold text-sm">{{ e.name }}</h1>
              <p class=" line-clamp-3 text-sm">{{ e.description }}</p>
            </div>

            <div class="row-span-4">
              <p class=" text-red-500 text-sm" v-if="e.linkPrefix == 'events'">{{ moment(e.startDate).calendar(null,
                  {
                    sameElse: 'MMM DD, [from] hh:mm A'
                  })
              }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Event Types -->
  </section>
  <!-- Events -->
</template>

<script setup>
import moment from 'moment-timezone'

const { data, pending, error, refresh } = await useAsyncData(
  'mountains',
  () => $fetch(`${process.env.API_URL}/feed`)
)

console.log(data);
console.log(error);
console.log();
</script>
