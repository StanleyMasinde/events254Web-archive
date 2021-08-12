<template>
  <CreateEvent :create-url="`/groups/${$route.params.company}/events`" />
</template>
<script>
export default {
  auth: false
}
</script>
