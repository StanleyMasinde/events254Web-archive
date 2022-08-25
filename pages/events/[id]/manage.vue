<template>
    <div class=" px-2">
        <div v-if="loading">
        <h1>Loading</h1>
        </div>


        <div v-else>
            <div class=" my-4">
                <h1 class=" text-xl"> <span class=" font-bold">Managing:</span> {{ currentEvent.about }}</h1>
                <nuxt-link class=" underline text-primary" :to="`/events/${eventId}`">View event</nuxt-link>
            </div>

            <div>
                <ul class="grid grid-rows-1 grid-cols-3 text-center grid-flow-col mt-4">
                    <nuxt-link :to="`/events/${eventId}/manage`">
                        <li class="custom--nav-tab">
                            General
                        </li>
                    </nuxt-link>
                    <nuxt-link :to="`/events/${eventId}/manage/tickets`">
                        <li class="custom--nav-tab">Tickets</li>
                    </nuxt-link>

                    <nuxt-link :to="`/events/${eventId}/manage/rsvps`">
                        <li class="custom--nav-tab">RSVPs</li>
                    </nuxt-link>
                </ul>
            </div>

            <div>
                <nuxt-child :currentEvent="currentEvent"></nuxt-child>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { Event } from '~~/plugins/api/api.js';
const route = useRoute()
const currentEvent: Ref<Event> = ref()
const loading: Ref<Boolean> = ref(true)
const eventId = ref(route.params.id)
const { $events254Api } = useNuxtApp()


const fetchEvent = async () => {
    const { data } = await $events254Api.getEventById(+eventId.value)
    currentEvent.value = data
    loading.value = false
}

onMounted(async () => {
    await fetchEvent()
})


definePageMeta({
    layout: 'event'
})
</script>