<template>
    <h1>Saved events</h1>
</template>

<script setup>
useHead({
    title: 'Saved events',
})
definePageMeta({
  middleware: ["auth"]
})
</script>