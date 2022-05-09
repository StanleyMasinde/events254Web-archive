<template>
    <section>
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
                <div v-else>
                    <h1>Virtual</h1>
                </div>
                <!--/ If virtual-->
            </div>
            <div class="">
                <img class="rounded-xl" :src="data.image ? data.image : 'https://picsum.photos/id/1/500/300'" />
            </div>
            <div class="absolute bottom-0 bg-black border-2 text-white rounded-xl p-2 left-28 -mb-5">
                <h1>{{ new Date(data.startDate).toDateString() }}</h1>
            </div>
        </div>
        <!--/ Venue location info-->

        <!--Event info-->
        <div class="mx-2 my-5">
            <h1 class=" text-2xl font-semibold line-clamp-1">{{ data.about }}</h1>
            <h1 class=" text-lg">By: {{ data.organiser.name ?? 'Events254' }}</h1>
        </div>
        <!--/ Event info-->

        <!--Event About-->
        <div class="mx-2 my-5">
            <h1 class=" text-lg font-semibold line-clamp-1">About</h1>
            <p class="">{{ data.description }}</p>
        </div>
    </section>
</template>

<script setup>

const config = useRuntimeConfig()
const route = useRoute()
const eventId = ref(route.params.id)
const { data, pending, refresh, error } = await useFetch(`${config.public.apiUrl}/events/${eventId.value}`)
// const { data, pending, error, refresh } = await useAsyncData(
//     'event',
//     () => $fetch(`${config.public.apiUrl}/events/${eventId.value}`),
// )

watch(eventId, () => {
    refresh()
})
useHead({
    title: data._value.about
})
</script>