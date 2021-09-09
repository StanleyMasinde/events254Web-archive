<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.smAndDown"
      color="primary"
      fixed
      app
      grow
    >
      <v-btn
        icon
        to="/"
      >
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        :to="`/calendar?date=${today}`"
      >
        <v-icon>mdi-calendar-outline</v-icon>
      </v-btn>
      <!-- Event creation button
      Sligtly different from the other buttons, as it is not a link, but a button
      -->
      <v-btn
        icon
        x-large
        to="/events/create"
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn
        icon
        to="/home"
      >
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        to="/search"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  computed: {
    today () {
      return this.$moment().format('YYYY-MM-DD')
    }
  }
}
</script>
