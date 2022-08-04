<template>
    <div>
        <form class="mt-5 flex flex-col gap-4 shadow-sm border p-3 rounded-lg" @submit.prevent="addNewTicket">
            <label for="type">
                <h1>Ticket class<span class=" text-red-500">*</span> </h1>
                <input placeholder="E.g VIP" class=" w-full rounded-lg" type="text" v-model="newTicket.type">
            </label>

            <label for="type">
                <h1>Ticket price<span class=" text-red-500">*</span> </h1>
                <input placeholder="E.g VIP" class="w-full rounded-lg" type="number" min="0" v-model="newTicket.price">
            </label>

            <label for="type">
                <h1>Ticket Limit<span class=" text-red-500">*</span> </h1>
                <input placeholder="E.g VIP" class=" w-full rounded-lg" type="number" v-model="newTicket.limit">
            </label>

            <button class=" bg-primary text-white rounded-lg py-2" type="submit">
                Add ticket
            </button>
        </form>

        <div class=" flex flex-col gap-2 m-1">
            <div class=" border" v-for="(t, i) in tickets">
                <h1 class=" font-bold">{{ t.type }}</h1>
                <h1>{{ t.price }}</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref, reactive } from 'vue';
import { Ticket, CreateTicketRequest } from '~~/plugins/api/api.js';
const route = useRoute()
const eventId = ref(route.params.id)
const { $events254Api } = useNuxtApp()
const tickets: Ref<Array<Ticket>> = ref([])
const newTicket: CreateTicketRequest = reactive({
    type: 'General admission',
    price: 0,
    limit: 0
})

const fetchTickets = async () => {
    const { data } = await $events254Api.getEventTickets(+eventId.value)
    tickets.value = data
}

const addNewTicket = async () => {
    const { data } = await $events254Api.createTicket(+eventId.value, newTicket)
    await fetchTickets()
}

onMounted(async () => {
    await fetchTickets()
})
</script>