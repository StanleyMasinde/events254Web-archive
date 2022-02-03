<template>
  <div>
    <AppBar title="Group - Members" />

    <v-container>
      <v-row v-if="$fetchState.pending" justify="center">
        <h1>Loading</h1>
      </v-row>

      <!-- Something went wrong! 😭 -->
      <v-row v-else-if="$fetchState.error">
        <div class="full-height">
          <v-img height="300" contain src="/not_found.svg">
            <v-container>
              <v-row justify="center">
                <v-col cols="12" md="8">
                  <h1 class="display-1 gray--text">
                    Sorry 😢 There's nothing here
                  </h1>
                  <v-btn text x-large color="primary" to="/">
                    Go home
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </div>
      </v-row>

      <v-row v-else justify="center">
        <SideNavigation />

        <v-col cols="12" lg="9" xl="10">
          <v-col cols="12" md="8">
            <div v-if="members.length > 0">
              <h3>This group has {{ members.length }} {{ members.length === 1 ? 'member' : 'members' }}</h3>
            </div>
            <v-list shaped dense>
              <v-card outlined>
                <v-list-item v-for="(m, i) in members" :key="i" :to="`/u/${m.userId}`">
                  <v-list-item-avatar>
                    <v-avatar tile color="brown" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h3>{{ m.name }}</h3>
                    </v-list-item-title>
                    <v-list-item-subtitle class="body-1">
                      <span class="subtitle">{{ m.bio }}</span> <br>
                      <small><i>Joined: {{ $moment(m.memberSince).format('Do MMMM YYYY') }}</i></small>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-list>
          </v-col>
          <v-col cols="12">
            <div v-if="members.length === 0">
              <h1
                class="display-1"
              >
                This group has no members
              </h1>
              <NoData />
            </div>
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
      group: {},
      members: []
    }
  },
  async fetch () {
    const company = await this.$axios.get(
      `/groups/${this.$route.params.company}`
    )
    const members = await this.$axios.get(
      `/groups/${this.$route.params.company}/members`
    )
    this.members = await members.data
    this.group = await company.data
  },
  head () {
    return {
      title: `${this.group.name} - members`
    }
  }
}
</script>
