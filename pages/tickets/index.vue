<template>
    <h1>
        <span class="text-gray-700">Tickets</span>
    </h1>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})


useHead({
    title: 'My tickets',
})
</script>