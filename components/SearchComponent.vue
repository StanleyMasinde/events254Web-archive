<template>
    <div class="rounded-lg bg-white px-2 py-4">
        <div class="relative">
            <input autofocus v-model="input"
                class="transition-all duration-200 form-input w-full border-2 h-12 rounded-lg focus:ring-primary focus:ring-2 focus:border-none"
                placeholder="Search for events, locations dates etc" />
            <button class="absolute bg-primary text-white p-2 rounded-lg right-1 top-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>

        {{ error }}

        <ul class="flex mt-4 gap-2 px-1 justify-center">
            <li @click.prevent="(ev: MouseEvent) => {tabItems = 0; return ev}" class="font-semibold">Events <span
                    class=" bg-gray-200 rounded-lg p-1">
                    {{ sResults?.events.length | 0 }}</span></li>
            <li @click.prevent="(ev: MouseEvent) => {tabItems = 1; return ev}" class="font-semibold">People
                <span class=" bg-gray-200 rounded-lg p-1">
                    {{ sResults?.users?.length | 0 }}</span>
            </li>
        </ul>
        <hr>

        <div v-if="tabItems == 0">
            <div class="flex flex-col gap-2" v-if="sResults?.events.length > 0">
                <router-link :to="`/events/${event.id}`" class="grid grid-cols-6 grid-rows-1 gap-2 border-b px-2 py-1"
                    v-for="(event, index) in sResults.events">
                    <div class="grid place-items-center">
                        <img class="rounded-lg aspect-square" :src="event.image" alt="">
                    </div>
                    <div class=" col-span-4">
                        <h1 class="font-semibold text-lg">{{ event.about }}</h1>
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {{ event?.location }}
                        </div>

                        <div class="text-red-500 flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <span>{{ moment(event?.startDate).format('MMM Do YYYY') }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <div v-if="tabItems == 1">
            <div class="flex flex-col gap-2" v-if="sResults?.users.length > 0">
                <router-link :to="`/u/${user.id}`" class="grid grid-cols-6 grid-rows-1 gap-2 border-b px-2 py-1"
                    v-for="(user, index) in sResults.users">
                    <div class="grid place-items-center">
                        <!-- <img class="rounded-lg aspect-square" :src="event.image" alt=""> -->
                    </div>
                    <div class=" col-span-4">
                        <h1 class="font-semibold text-lg">{{ user.name }}</h1>
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {{ user?.bio }}
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import moment from 'moment';
import { debounce } from 'lodash'

enum tabOptions {
    events,
    users
}

const $route = useRoute()
const $router = useRouter()
const input = ref(($route.query.q || '').toString())
const { data: sResults, pending, refresh, error } = await useAsyncData('search', async (c) => {
  const res = await c.$events254Api.search(input.value)
  return res.data
})
const tabItems: Ref<tabOptions> = ref(0)
function search() {
    $router.replace({ query: { q: input.value } });
    refresh()
}

watch(input, function () {
    const ff = debounce(search, 1000);
    ff()
})

</script>
