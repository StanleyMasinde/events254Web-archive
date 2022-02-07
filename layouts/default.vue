<template>
  <v-app>
    <!-- <v-navigation-drawer app fixed>
      <v-list-item>
        <v-list-item-avatar height="60" width="60">
          <v-img src="/icon.png" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list rounded>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item>

        <v-list-item to="/calendar">
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

        <v-spacer />

        <v-list-item>
          <v-btn
            rounded
            depressed
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
    </v-navigation-drawer> -->

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
        <v-icon size="60">
          mdi-plus-circle-outline
        </v-icon>
      </v-btn>

      <v-btn exact icon to="/home">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn icon to="/home/tickets">
        <v-icon>mdi-ticket</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-footer v-if="$vuetify.breakpoint.lgAndUp">
      <v-col cols="12" sm="4" md="3" class="text-center">
        <v-img contain src="/icon.png" height="150" class="mx-auto" />
      </v-col>
      <v-col cols="12" sm="8" md="3">
        <v-list-item-subtitle>
          <nuxt-link to="/" class="text-primary">
            Home
          </nuxt-link>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link to="/calendar" class="text-primary">
            Calendar
          </nuxt-link>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link to="/home" class="text-primary">
            Profile
          </nuxt-link>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link to="/search" class="text-primary">
            Search
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/faqs" class="text-primary">
            FAQs
          </nuxt-link>
        </v-list-item-subtitle>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-list-item-subtitle>
          <nuxt-link to="#" class="text-primary" @click="$auth.logout()">
            Logout
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/home/tickets" class="text-primary">
            Tickets
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/events/create" class="text-primary">
            Create an event
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/groups/create" class="text-primary">
            Start a new group
          </nuxt-link>
        </v-list-item-subtitle>
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <v-list-item-subtitle>
          <nuxt-link to="/about" class="text-primary">
            About
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/contact" class="text-primary">
            Contact
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/privacy" class="text-primary">
            Privacy policy
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/terms" class="text-primary">
            Terms of service
          </nuxt-link>
        </v-list-item-subtitle>
      </v-col>

      <v-col cols="12" class="text-center">
        <v-divider />
        <v-list-item-subtitle>
          <span class="text-primary body-1">
            &copy; 2020 - {{ new Date().getFullYear() }} Events254
          </span>
        </v-list-item-subtitle>
      </v-col>
    </v-footer>
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
