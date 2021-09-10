<template>
  <v-app>
    <!-- Navigation drawer with links to home, about, and contact pages -->
    <v-navigation-drawer app fixed>
      <!-- Logo -->
      <v-list-item>
        <v-list-item-avatar height="100" width="100">
          <v-img src="/icon.png" />
        </v-list-item-avatar>
      </v-list-item>

      <!-- Links to other pages -->
      <v-list rounded>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item>

        <v-list-item :to="`/calendar?date=${today}`">
          <v-list-item-icon>
            <v-icon>mdi-calendar-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Calendar </v-list-item-title>
        </v-list-item>

        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Profile </v-list-item-title>
        </v-list-item>

        <v-list-item to="/search">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Search </v-list-item-title>
        </v-list-item>

        <!-- Divider -->
        <v-divider />

        <!-- Spacer -->
        <v-spacer />

        <!-- Large button to create a new event -->
        <v-list-item>
          <v-btn
            rounded
            depressed
            block
            large
            color="primary"
            to="/events/create"
          >
            Create an event
          </v-btn>
        </v-list-item>
      </v-list>

      <template #append>
        <v-list-item v-if="$auth.user">
          <v-list-item-avatar>
            <v-avatar
              color="brown"
            >
              <span class="white--text">{{ $store.getters.initials }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.username || 'No username' }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="$auth.logout()">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-navigation-drawer>

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
      <v-btn icon to="/">
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn icon :to="`/calendar?date=${today}`">
        <v-icon>mdi-calendar-outline</v-icon>
      </v-btn>
      <!-- Event creation button
      Sligtly different from the other buttons, as it is not a link, but a button
      -->
      <v-btn icon x-large to="/events/create">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn icon to="/home">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn icon to="/search">
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
