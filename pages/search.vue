<template>
  <div>
    <AppBar title="Search for events" />

    <v-container>
      <v-row justify="center">
        <SideNavigation />

        <v-col cols="12" lg="9" xl="10">
          <v-col cols="12" md="10">
            <v-form method="POST" @submit.prevent="search">
              <v-text-field
                v-model="searchQuery"
                rounded
                outlined
                large
                append-icon="mdi-magnify"
                @click:append="search"
              />
            </v-form>
          </v-col>
          <v-col v-if="searchQuery.length >= 3" cols="12" md="10">
            <v-tabs class="title" center-active centered>
              <v-tab>
                <h3>Events {{ searchResults.events.length }} results</h3>
              </v-tab>
              <v-tab-item>
                <v-list v-if="searchResults.events.length > 0" rounded>
                  <v-card
                    v-for="(e, i) in searchResults.events"
                    :key="i"
                    :to="`/events/${e.id}`"
                    class="ma-2"
                    outlined
                    rounded
                  >
                    <v-list-item>
                      <v-list-item-avatar tile>
                        <v-img :src="e.image" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ e.about }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{
                            $moment(e.startDate).format(
                              "MMMM Do YYYY [at] h:mm a"
                            )
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-list>
                <h3 v-else>
                  No events were found matching {{ searchQuery }}
                </h3>
              </v-tab-item>

              <v-tab>
                <h3>Groups {{ searchResults.groups.length }} results</h3>
              </v-tab>

              <v-tab-item>
                <v-list v-if="searchResults.groups.length > 0" rounded>
                  <v-card
                    v-for="(g, i) in searchResults.groups"
                    :key="i"
                    :to="`/${g.slug}`"
                    class="ma-2"
                    outlined
                  >
                    <v-list-item>
                      <v-list-item-avatar tile>
                        <v-img :src="g.pictureUrl" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ g.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ g.city }}, {{ g.country }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-list>
                <h3 v-else>
                  No groups were found matching {{ searchQuery }}
                </h3>
              </v-tab-item>

              <v-tab>
                <h3>Users {{ searchResults.users.length }} results</h3>
              </v-tab>

              <v-tab-item>
                <v-list v-if="searchResults.users.length > 0" rounded>
                  <v-card
                    v-for="(u, i) in searchResults.users"
                    :key="i"
                    :to="`/u/${u.id}`"
                    class="ma-2"
                    outlined
                  >
                    <v-list-item shaped>
                      <v-list-item-avatar>
                        <v-avatar color="brown" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ u.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ u.bio }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-list>
                <h3 v-else>
                  No users were found matching {{ searchQuery }}
                </h3>
              </v-tab-item>
            </v-tabs>
          </v-col>

          <!-- The search query is empty -->
          <v-col v-if="!searchQuery" cols="12" md="10">
            <v-card outlined>
              <v-card-text>
                <h3>Search for events, groups, or users</h3>
                <p>
                  Search for events, groups, or users by typing in the search box
                  above.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- If the querry length is less than 3, show a message -->
          <v-col v-else-if="searchQuery.length < 3" cols="12" md="7">
            <h3>
              Please enter a longer search query.
              <br>
              The minimum length is 3 characters.
            </h3>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchQuery: '',
      searchResults: {
        events: [],
        groups: [],
        users: []
      }
    }
  },
  async fetch () {
    try {
      if (
        !this.searchQuery ||
        this.searchQuery.length < 3 ||
        !this.$route.query.q
      ) {
        return
      }
      const { data } = await this.$axios.get(
        `/search/?q=${this.searchQuery || this.$route.query.q}`
      )
      this.searchResults = data
    } catch (error) {
      throw new Error(error)
    }
  },
  head () {
    return {
      title: 'Search for events, groups, or users'
    }
  },
  auth: false,
  watch: {
    searchQuery () {
      if (this.searchQuery.length >= 3) {
        this.$router.push(`/search/?q=${this.searchQuery}`)
      }
    }
  },
  watchQuery (newQuery, oldQuery) {
    this.$fetch()
  },
  mounted () {
    this.searchQuery = this.$route.query.q || ''
    if (this.searchQuery.length >= 3) {
      this.$fetch()
    }
  },
  methods: {
    search () {
      this.$router.push(`/search?q=${this.searchQuery}`)
    }
  }
}
</script>
