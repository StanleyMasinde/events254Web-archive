<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <back-button :path="`/${$route.params.company}`" />
        {{ group.name || "Events 254" }} - Events
      </v-toolbar-title>
    </v-app-bar>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="10">
          <v-tabs grow>
            <v-tab :to="`/${$route.params.company}/events/all`">
              All
            </v-tab>
            <v-tab :to="`/${$route.params.company}/events/upcoming`">
              Upcoming
            </v-tab>
            <v-tab :to="`/${$route.params.company}/events/past`">
              Past
            </v-tab>
            <v-tab
              v-if="group.isManager"
              :to="`/${$route.params.company}/events/create`"
            >
              Create
            </v-tab>
          </v-tabs>
          <nuxt-child />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  auth: false,
  data () {
    return {
      group: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(`/groups/${this.$route.params.company}`)
    this.group = data
  },
  head () {
    return {
      title: `${this.group.name} - Events`
    }
  }
}
</script>
