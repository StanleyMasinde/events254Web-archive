<template>
  <Datepicker :partialRange="false" closeOnAutoApply :enableTimePicker="false" :placeholder="props.placeholder" autoApply :range="props.range" format="iii MMM dd yyyy" preventMinMaxNavigation utc :minDate="new Date()" :modelValue="props.modelValue"
    @update:modelValue="(v) => emit('update:modelValue', v)" />
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';
import { eachDayOfInterval } from 'date-fns';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
  modelValue: Array<string> | string | null,
  range?: boolean,
  placeholder?: string
}>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>
