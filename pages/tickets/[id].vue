<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div>
    Ticket ID: {{ route.params.id }}
  </div>
</template>

<style scoped></style>
