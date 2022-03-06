<template>
  <div>
    <client-only>
      <AppBar title="Events254" :back="false" />
    </client-only>

    <div style="width: 100%;">
      <v-img src="/home_bg.jpg" style="height: 500px;" gradient="to top right, rgba(0,0,0,.9), rgba(0,0,0,.1)">
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="11" md="7">
            <h1 class="display-1 white--text text-xs-center mb-3">
              What are your plans for the day?
            </h1>
            <v-text-field
              placeholder="Search for events, meetups, or anything else"
              append-icon="mdi-magnify"
              solo
              x-large
              @click="$router.push('/search')"
            />
          </v-col>
        </v-row>
      </v-img>
    </div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-row justify="center" class="mt-12">
            <v-col cols="12">
              <v-row>
                <v-col>
                  <h3 class="headline">
                    Browse by category
                  </h3>
                </v-col>
                <v-col class="text-right">
                  <v-btn text rounded color="primary" to="/categories">
                    See all
                  </v-btn>
                </v-col>
              </v-row>

              <div class="scroll-y-list">
                <v-card
                  v-for="(e, i) in eventCategories"
                  :key="i"
                  class="mb-3 mr-3"
                  outlined
                >
                  <v-img
                    contain
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                    height="150"
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
              </div>
            </v-col>
          </v-row>

          <client-only>
            <FetchLoading v-if="$fetchState.pending" landing-page />
            <FetchError v-else-if="$fetchState.error" :error="$fetchState.error" />

            <div
              v-for="(item, index) in newFeedObject"
              v-else
              :key="index"
              :class="{ 'mt-12': index > 0 }"
              justify="center"
            >
              <div v-if="item.data.length > 0">
                <v-row no-gutters>
                  <v-col>
                    <h2 class="headline">
                      {{ item.name }}
                    </h2>
                  </v-col>
                  <v-col class="text-right">
                    <v-btn icon rounded color="primary" to="/categories">
                      <v-icon left>
                        mdi-arrow-right
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="scroll-y-list">
                  <div v-for="(it, ind) in item.data" :key="ind">
                    <v-card
                      :to="
                        it.linkPrefix == 'groups'
                          ? `/${it.id}`
                          : `/events/${it.id}`
                      "
                      height="350"
                      style="width: 90%"
                      outlined
                      class="mt-3 mr-3"
                    >
                      <v-img
                        height="200"
                        contain
                        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                        :src="it.image ? it.image : '/icon.png'"
                        lazy-src="/icon.png"
                      >
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            dark
                            icon
                            @click="$router.push(`/evengts/${it.id}`)"
                          >
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                          <v-btn dark icon>
                            <v-icon>mdi-share-variant</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-img>
                      <v-card-text class="body-1">
                        <span
                          v-if="it.linkPrefix == 'events'"
                          class="red--text"
                        >
                          <span>{{ $moment(it.startDate).calendar(null, {
                            sameElse: 'MMM DD, [from] hh:mm A'
                          }) }}</span>
                        </span>
                        <br>
                        <span class="heading">
                          {{ it.name }}
                        </span>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
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
      filter: {
        category: []
      },
      newFeedObject: {}
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/feed')
      this.newFeedObject = data
    } catch (error) {
      this.$sentry.captureException(error)
      throw new Error(error)
    }
  },
  auth: false,
  methods: {
    stripHtmltags (html) {
      return html.replace(/<(?:.|\n)*?>/gm, '')
    },
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
