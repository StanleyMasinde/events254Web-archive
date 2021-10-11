<template>
  <div>
    <AppBar :title="`${group.name} Events`" />
    <v-container fluid>
      <v-row>
        <SideNavigation />

        <v-col cols="12" lg="9" xl="10">
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
