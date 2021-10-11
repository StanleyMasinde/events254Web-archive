<template>
  <div>
    <AppBar title="Home" />

    <v-container>
      <v-row justify="center">
        <SideNavigation />

        <v-col cols="12" lg="9" xl="10">
          <v-col cols="12">
            <h1 class="display-1">
              {{ greeting }}
            </h1>
          </v-col>
          <v-col cols="12" lg="10" sm="8">
            <v-tabs grow>
              <v-tab exact to="/home">
                Home
              </v-tab>
              <v-tab to="/home/profile">
                Profile
              </v-tab>
              <v-tab to="/home/events">
                My Events
              </v-tab>
              <v-tab to="/home/groups">
                My Groups
              </v-tab>
              <v-tab to="/home/tickets">
                Tickets
              </v-tab>
            </v-tabs>
            <nuxt-child />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: this.$auth.user.name || ''
    }
  },
  computed: {
    greeting () {
      const timeOfDay = this.$moment().hour()
      const user = this.$auth.user.name.split(' ')[0]

      if (timeOfDay < 12) {
        return `Good Morning, ${user}`
      } else if (timeOfDay < 18) {
        return `Good Afternoon, ${user}`
      } else {
        return `Good Evening, ${user}`
      }
    }
  }
}
</script>
