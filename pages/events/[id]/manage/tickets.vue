<template>
    <div>
        <form v-if="showAddTicketForm" class="mt-5 flex flex-col gap-4 shadow-sm border p-3 rounded-lg"
            @submit.prevent="addNewTicket">
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
            <button @click="showAddTicketForm = false" class="border border-primary rounded-lg py-2" type="submit">
                Cancel
            </button>
        </form>

        <div class="flex flex-col gap-2 m-1" v-if="tickets.length > 0">
            <div class="border-2 border-black rounded-lg p-2" v-for="(t, i) in tickets">
                <h1 class="font-bold text-lg">{{ t.type }}</h1>
                <h1 class=" font-semibold">Price: {{ t.price }}</h1>

                <hr>
                <div class="mt-2 flex flex-col">
                    <button @click.prevent="deleteTicket(t.id)"
                        class=" border bg-primary text-white rounded-lg py-1 px-2">Delete ticket</button>
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col gap-2 m-5 text-center">
            <h1 class=" font-extrabold text-xl">This event has no tickets</h1>
            <p>You can add the first one by clicking the "Add ticket" button below"</p>
        </div>

        <div v-if="showAddTicketForm == false" class="flex flex-col gap-2 m-5 text-center">
            <button class=" bg-primary text-white rounded-lg py-1 px-3" @click.prevent="showAddTicketForm = true">Add
                ticket</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref, reactive } from 'vue';
import { Ticket, CreateTicketRequest } from '~~/plugins/api/api.js';
const route = useRoute()
const eventId = ref(route.params.id)
const { $events254Api } = useNuxtApp()
const showAddTicketForm: Ref<Boolean> = ref(false)
const newTicket: CreateTicketRequest = reactive({
    type: 'General admission',
    price: 0,
    limit: 0
})

const { data: tickets, pending, refresh, error } = await useAsyncData('tickets', async () => {
    const res = await $events254Api.getEventTickets(+eventId.value)
    return res.data
}, { initialCache: false })


const addNewTicket = async () => {
    try {
        await $events254Api.createTicket(+eventId.value, newTicket)
        showAddTicketForm.value = false
        await refresh()
    } catch (error) {
        showError(error)
    }
}

const deleteTicket = async (ticketId: number, ev) => {
    try {
        await $events254Api.deleteTicket(+eventId, ticketId)
        await refresh()
    } catch (error) {
        showError(error)
    }
}
</script>