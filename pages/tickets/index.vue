<template>
    <div>
        <div class="flex gap-2 flex-col">
            <router-link :to="`/tickets/${ticket.ticketId}`" v-for="(ticket, index) in tickets">
                <div class=" border rounded-2xl px-2 py-3 mx-1">
                    <h1 class="font-semibold text-xl truncate">{{ ticket.eventName }}</h1>
                    <h2 class=" text-red-500">{{ moment(ticket.eventDate).toLocaleString() }}</h2>

                    <div v-if="ticket.eventLocation" class="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <h1 class=" font-semibold">{{ ticket.eventLocation }}</h1>
                    </div>

                    <div class=" mt-2">
                        <h2>Ticket price: <span class=" font-mono">{{ formatCurrency(ticket.ticketPrice) }}</span> {{
                                ticket.tikcetCount
                        }}</h2>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import moment from 'moment';

const { $events254Api } = useNuxtApp()
const { data: tickets, pending, refresh, error } = await useAsyncData('tickets', async () => {
    const res = await $events254Api.getCurrentUsersTickets()
    return res.data
}, { initialCache: false })
const formatCurrency = (number: number) => {
    return Intl.NumberFormat('en-UK', { style: 'currency', currency: 'ksh' }).format(number)
}
definePageMeta({
    middleware: ["auth"],
})
useHead({
    title: 'My tickets',
})
</script>
