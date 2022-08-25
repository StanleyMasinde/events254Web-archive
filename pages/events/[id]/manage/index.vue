<template>
    <div>
        <form class="p-3 mt-4 flex flex-col gap-2" action="#" method="post">
            <label for="about">
                <h1 class=" font-semibold text-lg">Title</h1>
                <input class="w-full rounded-lg" v-model="currentEvent.about" type="text" name="about" id="">
            </label>

            <label for="about">
                <h1 class=" font-semibold text-lg">Description</h1>
                <RichEditor v-model="currentEvent.description" />
            </label>

            <button class=" bg-primary py-2 text-white rounded-lg" type="submit">Update event</button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { Event } from '~~/plugins/api/api.js';
const props = defineProps<{
    currentEvent: Event
}>()
</script>