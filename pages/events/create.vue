<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <back-button />
        <span class="title">Create Event</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <h1 class="display-1">
            New Event
          </h1>
        </v-col>
        <v-col cols="12" md="6">
          <CreateEvent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
