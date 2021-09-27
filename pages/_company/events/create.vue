<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <CreateEvent :create-url="`/groups/${$route.params.company}/events`" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  auth: false
}
</script>
