<template>
    <section class=" px-1 sm:px-16">
        <!--Venue location info-->
        <div class="m-2 rounded-xl  relative">
            <div class=" bg-white border-2 absolute top-2 left-2 rounded-xl p-2">
                <!--if physical-->
                <div class="flex" v-if="data.location !== 'N/A'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h1>{{ data.location }}</h1>
                </div>
                <!--/ If physical-->
                <!--if virtual-->
                <div class="flex" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h1>Virtual</h1>
                </div>
                <!--/ If virtual-->
            </div>
            <div class="border-2 rounded-xl">
                <img class="rounded-xl w-full" :src="data.image ? data.image : 'https://picsum.photos/id/1/500/300'" />
            </div>
            <div class="absolute w-full bottom-0 px-24 sm:px-64 text-center">
                <div class="bg-primary border-2 text-white line-clamp-1 rounded-xl p-1 -mb-5">
                    <h1>{{ new Date(data.startDate).toDateString() }}</h1>
                </div>
            </div>
        </div>
        <!--/ Venue location info-->

        <!--Event info-->
        <div class="mx-2 my-5">
            <h1 class=" text-2xl font-semibold line-clamp-1">{{ data.about }}</h1>
            <h1 class=" text-lg">By: {{ data.organiser?.name ?? 'Events254' }}</h1>
        </div>
        <!--/ Event info-->

        <!--Attendees-->
        <div class="mx-2 my-5">
            <h1 class="text-lg font-semibold">Attendees</h1>
            <div class="flex flex-wrap">
                <div v-for="(attendee, index) in data.attendees" :key="index"
                    class="bg-blue-400 h-10 w-10 flex justify-center items-center rounded-full border-2  -ml-5 first:ml-0 text-center">
                    <div>
                        <h1 class=" font-bold">{{ getInnitials(attendee.name) }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Attendees-->

        <!--Event About-->
        <div class="mx-2 my-5">
            <h1 class=" text-lg font-semibold line-clamp-1">About</h1>
            <p class="">{{ data.description }}</p>
        </div>

        <!--Admin Button-->
        <div v-if="data.can_edit" class=" fixed left-0 bottom-1 w-screen px-1 sm:px-20">
            <nuxt-link :to="`/events/${data.id}/manage`">
                <button class="rounded-xl text-white bg-primary py-3 w-full flex gap-1 justify-center content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <div class="">
                        <h1 class=" font-bold text-lg">Manage Event</h1>
                    </div>
                </button>
            </nuxt-link>
        </div>
        <!--/Admin Button-->

        <!--Ticket Button-->
        <div v-else class=" fixed left-0 bottom-1 w-screen px-1 sm:px-20">
            <button class="rounded-xl text-white bg-primary py-3 w-full flex gap-1 justify-center content-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <div class="">
                    <h1 class=" font-bold text-lg">Buy Tickets</h1>
                </div>
            </button>
        </div>
        <!--/Ticket Button-->
    </section>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const eventId = ref(route.params.id)
const { $axios } = useNuxtApp()
const { data, pending, refresh, error } = await useAsyncData('event', async () => {
    const res = await $axios.get(`/events/${eventId.value}`)
    return res.data
})

onMounted(async () => {
    await refreshNuxtData('event')
})
definePageMeta({
    layout: 'event',
})
useHead({
    title: data.value.about
})

function getInnitials(name) {
    const names = name.split(' ')
    const initials = names.map(name => name[0].toUpperCase())
    return initials[0] + initials[1]
}
</script>