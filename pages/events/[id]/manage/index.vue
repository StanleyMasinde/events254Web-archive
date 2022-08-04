<template>
    <div>
        <h1>
            {{ currentEvent.about }}
        </h1>
    </div>
</template>

<script lang="ts" setup>
import { Event } from '~~/plugins/api/api.js';
const props = defineProps<{
    currentEvent: Event
}>()
</script>