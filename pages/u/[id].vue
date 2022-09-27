<template>
  <div class="p-3">
    <div v-if="pending">
      <h1>Loading</h1>
    </div>

    <div v-else>
      <div v-if="user">
        <div class="text-center mb-5">
          <h1 class="font-bold text-3xl">{{ user.name }}</h1>
          <h3>{{ user.username }}</h3>
          <h4>{{ user.bio }}</h4>
          <h5 class=" font-semibold">Joined {{ moment(user.created_at).fromNow() }}</h5>
          <h5>Total events: {{ user.events?.length }}</h5>
        </div>

        <div>
          <div class="mb-3">
            <h1 class=" font-bold text-2xl">Events by {{ user.name }}</h1>
          </div>

          <div @click.prevent="navigateTo(`/events/${event.id}`)" v-for="event in user.events"
            class="border rounded-lg shadow-lg mb-2">
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
              <img class="h-24 w-full" :src="event.image" :alt="event.about">
              <div class=" col-span-2">
                <h1 class=" font-bold text-lg line-clamp-1">{{ event.about }}</h1>
                <h1 class="font-mono text-red-500 text-sm">{{ moment(event.startDate) }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
const { $events254Api } = useNuxtApp()
const route = useRoute()
const { data: user, pending, refresh, error } = await useAsyncData('user', async () => {
  const res = await $events254Api.getUser(+route.params.id)
  return res.data
}, { initialCache: false })


if (!user.value) {
  showError({ statusCode: 404, statusMessage: "User not found" })
}
</script>