<template>
    <h1>
        <span class="text-gray-700">Tickets</span>
    </h1>
</template>

<script lang="ts" setup>
import { Ref, reactive } from 'vue';
import { Ticket, CreateTicketRequest } from '~~/plugins/api/api.js';
definePageMeta({
  middleware: ["auth"]
})
useHead({
    title: 'My tickets',
})


const route = useRoute()
const eventId = ref(route.params.id)
const { $events254Api } = useNuxtApp()
const tickets: Ref<Array<Ticket>> = ref([])

const fetchTickets = async () => {
    const { data } = await $events254Api.getCurrentUsersTickets()
    tickets.value = data
}

onMounted(async () => {
    await fetchTickets()
})
</script>