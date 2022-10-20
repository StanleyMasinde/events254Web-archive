<template>
  <Datepicker range :start-time="startTime" minutes-increment="15" time-picker closeOnAutoApply :placeholder="props.placeholder" preventMinMaxNavigation :modelValue="props.modelValue"
    @update:modelValue="(v) => emit('update:modelValue', v)" />
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
  modelValue: Array<string> | string | null,
  placeholder?: string
}>()
const emit = defineEmits(['update:modelValue'])
const startTime = ref({ hours: 9, minutes: 0 });
</script>

<style scoped>

</style>
