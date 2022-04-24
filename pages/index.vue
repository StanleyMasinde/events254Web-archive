<template>
  <h1 class="text-3xl font-bold underline">
    Hello {{ name }}
  </h1>
</template>

<script setup>
import { ref } from 'vue';


definePageMeta({
  title: 'Events254'
})
const name = ref('John');
const message = ref('Hello Doe');
</script>
