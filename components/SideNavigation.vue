<template>
  <v-col v-if="$vuetify.breakpoint.lgAndUp" lg="2" xl="2">
    <v-card class="mt-9 sticky-top" outlined>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/calendar">
        <v-list-item-icon>
          <v-icon>mdi-calendar-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/search">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/home">
        <v-list-item-icon>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          to="/events/create"
          color="primary"
          rounded
          large
          block
          depressed
        >
          Create Event
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style>
    .sticky-top {
        position: -webkit-sticky!important;
        position: sticky!important;
        top: 0!important;
    }
</style>
