<template>
  <div>
    <client-only>
      <AppBar title="Create event" />
    </client-only>

    <div class="my-row">
      <v-col cols="12" md="6">
        <CreateEvent />
      </v-col>
    </div>
  </div>
</template>

<style scoped>
.my-row {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
