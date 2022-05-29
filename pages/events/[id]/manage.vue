<template>
    <div class=" px-2">
        <h1>Manage</h1>


        <div>
            <ul class="grid grid-rows-1 grid-cols-3 text-center grid-flow-col mt-4">
                <nuxt-link :to="`/events/${eventId}/manage`">
                    <li>
                        General
                    </li>
                </nuxt-link>
                <nuxt-link :to="`/events/${eventId}/manage/tickets`">
                    <li>Tickets</li>
                </nuxt-link>

                <nuxt-link :to="`/events/${eventId}/manage/rsvps`">
                    <li>RSVPs</li>
                </nuxt-link>
            </ul>
        </div>

        <div>
            <nuxt-child></nuxt-child>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const eventId = ref(route.params.id)
</script>