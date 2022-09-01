<template>
  <div class="m-5 rounded-lg bg-primary text-white">
    <div class="text-center">
      <h1 class=" font-semibold text-lg">{{ ticket?.eventName }}</h1>

      <p>Ticket will be active from</p>

      <div class="grid grid-rows-1 grid-cols-2 m-5 py-3 bg-white text-black rounded-lg">
        <div>
          <h1 class=" font-bold text-xl">{{ moment(ticket?.eventDate).format('HH:MM a') }}</h1>
          <p class=" text-sm">{{ moment(ticket?.eventDate).format('MMMM Do YYYY') }}</p>
        </div>
        <div>
          <h1 class=" font-bold text-xl">{{ moment(ticket?.eventDate).format('HH:MM a') }}</h1>
          <p class=" text-sm">{{ moment(ticket?.eventDate).format('MMMM Do YYYY') }}</p>
        </div>
      </div>

      <div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserTicket } from '~~/plugins/api/api';
import { Ref } from 'vue';
import moment from 'moment-timezone'

const route = useRoute()

const { $events254Api } = useNuxtApp()
const ticket: Ref<UserTicket> = ref();
const getTicket = async () => {
  const { data } = await $events254Api.getASingleTicket(+route.params.id)
  ticket.value = data
}

definePageMeta({
  middleware: "auth",
  layout: "ticket"
})

onMounted(() => {
  getTicket()
})
</script>
