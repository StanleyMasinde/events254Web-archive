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
      <v-btn icon to="/">
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn icon to="/calendar">
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
          <nuxt-link to="/" class="body-1">
            Home
          </nuxt-link>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link to="/calendar" class="body-1">
            Calendar
          </nuxt-link>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link to="/home" class="body-1">
            Profile
          </nuxt-link>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link to="/search" class="body-1">
            Search
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/faqs" class="body-1">
            FAQs
          </nuxt-link>
        </v-list-item-subtitle>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-list-item-subtitle>
          <nuxt-link to="#" class="body-1" @click="$auth.logout()">
            Logout
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/home/tickets" class="body-1">
            Tickets
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/events/create" class="body-1">
            Create an event
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/groups/create" class="body-1">
            Start a new group
          </nuxt-link>
        </v-list-item-subtitle>
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <v-list-item-subtitle>
          <nuxt-link to="/about" class="body-1">
            About
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/contact" class="body-1">
            Contact
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/privacy" class="body-1">
            Privacy policy
          </nuxt-link>
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          <nuxt-link to="/terms" class="body-1">
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
