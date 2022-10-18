<template>
  <div class="m-5 rounded-lg bg-primary text-white">
    <div class=" p-3">
      <img class=" h-64 aspect-video" :src="ticket?.image || '/hero.jpg'" :alt="ticket?.eventName">
    </div>
    <div class="text-center">
      <div class="mt-2 p-2">
        <h1 class=" font-extrabold text-lg uppercase">{{ ticket?.eventName }}</h1>
      </div>
      <p>Ticket will be active from</p>
      <div class="grid grid-rows-1 grid-cols-2 mx-5 mb-5 py-3 bg-white text-black rounded-lg">
        <div>
          <h1 class=" font-extrabold text-xl">{{ moment(ticket?.eventDate).format('HH:MM a') }}</h1>
          <p class=" text-sm">{{ moment(ticket?.eventDate).format('MMM Do YYYY') }}</p>
        </div>
        <div>
          <h1 class=" font-extrabold text-xl">{{ moment(ticket?.endDate).format('HH:MM a') }}</h1>
          <p class=" text-sm">{{ moment(ticket?.endDate).format('MMM Do YYYY') }}</p>
        </div>
      </div>

      <div class=" bg-white h-[.10rem] before:bg-black">
      </div>

      <div v-if="ticket" class="m-5 rounded-lg bg-primary text-white flex justify-center p-5">
        <img class=" rounded-lg border-2 aspect-square"
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://events254.co.ke/tickets/${ticket?.ticketId}`"
          alt="QR Code">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment-timezone'

const route = useRoute()
const { $events254Api } = useNuxtApp()
const { data: ticket, pending, refresh, error } = await useAsyncData('tickets', async () => {
    const res = await $events254Api.getASingleTicket(+route.params.id)
    return res.data
}, { initialCache: false })

definePageMeta({
  middleware: "auth",
  layout: "ticket",
})
useHead({
  title: ticket.value.eventName,
  meta: [
    {
      name: 'description',
      content: 'Ticket for user'
    }
  ]
})

</script>
