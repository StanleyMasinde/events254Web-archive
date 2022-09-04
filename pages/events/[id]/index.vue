<template>
    <section class=" px-1 sm:px-16">
        <!--Venue location info-->
        <div class="m-2 rounded-xl  relative">
            <div class=" bg-white border-2 absolute top-2 left-2 rounded-xl p-2">
                <!--if physical-->
                <div class="flex" v-if="event?.location !== 'N/A'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h1>{{ event?.location }}</h1>
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
                <img class="rounded-xl w-full" :src="event?.image || '/hero.svg'" />
            </div>
            <div class="absolute w-full bottom-0 px-24 sm:px-64 text-center">
                <div class="bg-primary border-2 text-white line-clamp-1 rounded-xl p-1 -mb-5">
                    <h1>{{ moment(event?.startDate).format('MMM Do YYYY') }}</h1>
                </div>
            </div>
        </div>
        <!--/ Venue location info-->

        <!--Event info-->
        <div class="mx-2 my-5">
            <h1 class=" text-2xl font-semibold line-clamp-1">{{ event?.about }}</h1>
            <h1 class=" text-lg">By: {{ event?.organiser?.name ?? 'Events254' }}</h1>
        </div>
        <!--/ Event info-->

        <!--Attendees-->
        <div class="mx-2 my-5">
            <h1 class="text-lg font-semibold">Attendees</h1>
            <div class="flex flex-wrap">
                <div v-for="(attendee, index) in event?.attendees" :key="index"
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
            <div class="prose prose-a:text-primary prose-li:list-disc px-3" v-html="event?.description"></div>
        </div>

        <div class=" mb-20"></div>

        <!--Admin Button-->
        <div v-if="event?.can_edit" class=" fixed left-0 bottom-1 w-screen px-1 sm:px-20">
            <nuxt-link :to="`/events/${event.id}/manage`">
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

        <!--Not admin-->
        <div v-else>
            <!--Ticket Button-->
            <div v-if="!event?.currentUserTicket" class=" fixed left-2 right-2 bottom-1 px-1 sm:px-20">
                <button @click.prevent="showdialogForBuyingTicket"
                    class="rounded-xl text-white bg-primary py-3 w-full flex gap-1 justify-center content-center">
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

            <!--Link to the current ticket-->
            <div v-else class=" fixed left-2 right-2 bottom-1 px-1 sm:px-20">
                <router-link :to="`/tickets/${event?.currentUserTicket?.id}`">
                    <button
                        class="rounded-xl text-white bg-primary py-3 w-full flex gap-1 justify-center content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <div class="">
                            <h1 class=" font-bold text-lg">See your ticket</h1>
                        </div>
                    </button>
                </router-link>
            </div>
            <!--/Link to the current ticket-->
        </div>


        <!--Dialog for ticket creation-->
        <div v-if="showTicketDialog"
            class="flex flex-col gap-2 border bottom-0 bg-slate-200 backdrop-blur-lg rounded-lg p-2 shadow-2xl z-50 fixed inset-x-2">
            <h1 class="font-bold text-lg">Choose a ticket</h1>
            <div @click="selectedTicket = t.id" :class="{ 'border-l-8 border-l-primary mx-2': selectedTicket == t.id }"
                class="transition-all duration-500 border border-primary rounded-lg p-2"
                v-for="(t, i) in event?.tickets">
                <div>
                    <h1 class="font-semibold">{{ t.type }}</h1>
                    <h1 class=" font-mono">{{ formatCurrency(t?.price) }}</h1>
                </div>
                <div></div>
            </div>

            <button @click.prevent="buyTicket" class="bg-primary rounded-lg text-white py-2">Confirm choice</button>
            <button @click="hidedialogForBuyingTicket"
                class="border border-green-800 text-green-800 rounded-lg py-2">Cancel</button>
        </div>
        <!--/Dialog for ticket creation-->
    </section>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import moment from 'moment';
const route = useRoute()
const router = useRouter()
const eventId = ref(route.params.id)
const selectedTicket: Ref<number> = ref(null)
const { $events254Api } = useNuxtApp()
const showTicketDialog: Ref<boolean> = ref(false)
const { data: event, pending, refresh, error } = await useAsyncData('event', async () => {
    const res = await $events254Api.getEventById(+eventId.value)
    return res.data
}, { initialCache: false })


definePageMeta({
    layout: 'event',
})
useHead({
    title: event.value?.about
})

function getInnitials(name: string) {
    const names = name.split(' ')
    const initials = names.map(name => name[0].toUpperCase())
    return initials[0] + initials[1]
}

const showdialogForBuyingTicket = () => {
    showTicketDialog.value = true
}
const hidedialogForBuyingTicket = () => {
    showTicketDialog.value = false
}

const formatCurrency = (number: number): string => {
    return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'kes'
    }).format(number)
}

/**
 * Buy event ticket
 */
const buyTicket = async () => {
    try {
        const { data } = await $events254Api.orderTicket(+eventId.value, {
            ticket_id: selectedTicket.value,
            rsvp_count: 1
        })
        router.push(`/tickets/${data.ticketId}`)
    } catch (error) {
        showError(error)
    }
}
</script>