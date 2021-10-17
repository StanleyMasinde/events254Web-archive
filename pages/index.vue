<template>
  <div>
    <client-only>
      <AppBar title="Events254" :back="false" />
    </client-only>

    <v-container fluid>
      <v-row justify="center">
        <SideNavigation />

        <v-col cols="12" lg="6" xl="4">
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6" class="pt-5">
              <h1 class="">
                There are a lot of things to do here.
              </h1>
              <p class="body-1">
                Find activities, meetups, and more in your city. Sell your
                tickets, or buy them for free. Find a local event, or create a
                new one. Find people, or create a new event. The possibilities
                are endless!
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-img
                contain
                src="https://res.cloudinary.com/streetcoder/image/upload/v1626949280/events254/undraw_events_2p66_sx7tl4.svg"
              />
            </v-col>
          </v-row>

          <v-row justify="center" class="mt-12">
            <v-col cols="12" md="10">
              <v-row cols="12" no-gutters>
                <v-col>
                  <h2>Browse by category</h2>
                </v-col>
                <v-col class="text-right">
                  <v-btn text rounded color="primary" to="/categories">
                    See more
                  </v-btn>
                </v-col>
              </v-row>

              <v-carousel hide-delimiters height="100" cycle>
                <v-carousel-item v-for="(e, i) in eventCategories" :key="i">
                  <v-card>
                    <v-img
                      contain
                      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                      height="100"
                      :src="e.image ? e.image : '/icon.png'"
                    >
                      <v-row
                        no-gutters
                        justify="center"
                        align="center"
                        style="height: 100%"
                      >
                        <v-col class="text-center white--text">
                          <h1 class="title">
                            {{ e.name }}
                          </h1>
                        </v-col>
                      </v-row>
                    </v-img>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>

          <client-only>
            <FetchLoading v-if="$fetchState.pending" landing-page />
            <FetchError v-else-if="$fetchState.error" />

            <v-row v-else justify="center" class="mt-12">
              <v-col cols="12" md="10">
                <div
                  v-if="eventsObject.upcomingEvents.length === 0"
                  class="text-center"
                >
                  <h3>Nothing here</h3>
                </div>
                <v-row v-else>
                  <v-col v-for="(c, indx) in eventsObject" :key="indx" cols="12">
                    <div v-if="c.events.length === 0" class="text-center">
                      <h3>
                        Such empty ⦰
                      </h3>
                    </div>
                    <v-col v-if="c.events.length > 0" cols="12">
                      <v-row>
                        <v-col>
                          <h2>{{ c.name }}</h2>
                        </v-col>
                        <v-col class="text-right">
                          <v-btn text rounded color="primary" to="/events">
                            See more
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-carousel v-if="c.events.length > 0" height="300" hide-delimiter-background cycle>
                      <v-carousel-item
                        v-for="(e, i) in c.events"
                        :key="i"
                        cols="11"
                      >
                        <v-card
                          outlined
                          :to="`/events/${e.id}`"
                          class="ma-2 no-overflow"
                          rounded
                        >
                          <v-img height="200" class="pa-3" :src="e.image">
                            <v-row>
                              <v-col>
                                <div class="text-left">
                                  <h3 class="error--text custom-shadow display-1">
                                    {{ new Date(e.startDate).getDate() }}
                                  </h3>
                                  <span class="error--text custom-shadow">{{
                                    months[$moment(e.startDate).month()]
                                  }}</span>
                                </div>
                              </v-col>
                              <v-col
                                v-if="e.isFree"
                                class="teal--text title text-right custom-shadow"
                              >
                                <h3>Free</h3>
                              </v-col>
                              <v-col
                                v-else
                                class="text-right title white--text custom-shadow"
                              >
                                <h3>{{ formatCurrency(e.lowestPrice) }}</h3>
                              </v-col>
                            </v-row>
                          </v-img>
                          <v-list-item dense>
                            <v-list-item-content class="body-1">
                              <v-list-item-title :title="e.about">
                                {{ e.about }}
                              </v-list-item-title>
                              <v-list-item-subtitle class="red--text">
                                <v-icon>mdi-calendar-outline</v-icon>
                                {{
                                  $moment(e.startDate).format(
                                    "MMMM Do YYYY [at] h:mm a"
                                  )
                                }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                <v-icon>mdi-map-marker-outline</v-icon>
                                {{ e.isOnline ? "Online" : e.location }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-carousel-item>
                    </v-carousel>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </client-only>
        </v-col>
      </v-row>

      <v-col cols="12">
        <v-btn
          v-if="!$vuetify.breakpoint.smAndDown"
          to="/events/create"
          color="accent"
          fab
          fixed
          right
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchQuery: null,
      noMoreEvents: false,
      eventCategories: [
        {
          id: 1,
          name: 'General',
          image:
            'https://res.cloudinary.com/streetcoder/image/upload/v1628589266/events254/undraw_special_event_4aj8_mfr8rp.svg'
        },
        {
          id: 2,
          name: 'Music',
          image:
            'https://res.cloudinary.com/streetcoder/image/upload/v1628589266/events254/undraw_Music_re_a2jk_ixnbvy.svg'
        },
        {
          id: 3,
          name: 'Dance',
          image:
            'https://res.cloudinary.com/streetcoder/image/upload/v1628589266/events254/undraw_workout_gcgu_meujil.svg'
        }
      ],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      filter: {
        category: []
      },
      eventsObject: {}
    }
  },
  async fetch () {
    if (process.client) {
      this.$http.setBaseURL(process.env.API_URL)
    }
    try {
      const data = await this.$http.get('/events?paginate=6')
      this.eventsObject = await data.json()
    } catch (error) {
      this.$sentry.captureException(error)
      throw new Error(error)
    }
  },
  auth: false,
  methods: {
    formatCurrency (value = 0) {
      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'kes'
      }).format(value)
    },
    search () {
      this.$router.push(`/search?q=${this.searchQuery}`)
    },
    async loadMore () {
      const { data } = await this.$axios.get(this.eventsObject.nextPageUrl)
      if (data.events.length === 0) {
        this.noMoreEvents = true
        return
      }
      this.eventsObject.nextPageUrl = data.nextPageUrl
      data.events.forEach((ev) => {
        this.eventsObject.events.push(ev)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.one-line {
  white-space: nowrap;
  overflow: hidden;
}
</style>
