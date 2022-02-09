<template>
  <div>
    <client-only>
      <AppBar title="Event" />
    </client-only>

    <v-container fluid>
      <!-- Still loading the group information -->
      <FetchLoading v-if="$fetchState.pending" event-page />

      <!-- Something went wrong! 😭 -->
      <FetchError v-else-if="$fetchState.error" />

      <!-- Event body -->
      <v-row v-else justify="center">
        <v-col cols="12" md="8">
          <p>
            <span v-if="currentEvent.allDay" class="text--secondary">
              {{
                $moment(currentEvent.startDate).calendar(null, {
                  sameElse: "MMMM D, YYYY",
                })
              }}
            </span>
            <span v-else class="text--secondary">{{
              $moment(currentEvent.startDate).format("MMMM Do YYYY [at] h:mm a")
            }}</span>
            <br>
            <span class="text-h5 font-weight-bold">
              {{ currentEvent.about }}
            </span>
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="5">
          <v-card flat>
            <v-img
              gradient="to top right, rgba(100,115,201,.1), rgba(25,32,72,.4)"
              height="350"
              contain
              :src="currentEvent.image ? currentEvent.image : '/icon.png'"
            />
          </v-card>
        </v-col>
        <v-col class="sticky-top" cols="12" md="3">
          <v-card outlined>
            <v-card-text class="body-1">
              <span class="red--text">
                <span v-if="differenceInDays === 0">
                  All-day event <br>
                  {{
                    getTimeStringForSameDay(
                      currentEvent.startDate,
                      currentEvent.endDate
                    )
                  }}
                </span>
                <span v-else>
                  {{
                    getTimeStringForDifferentDay(
                      currentEvent.startDate,
                      currentEvent.endDate
                    )
                  }}
                </span>
              </span>
              <br>
              Event by:
              <router-link :to="organiserLink">
                {{
                  currentEvent.organiser ? currentEvent.organiser.name : "N/A"
                }}
              </router-link>
              <br>
              Location: {{ currentEvent.location || "Online" }}
            </v-card-text>
            <template v-if="currentEvent.attendees">
              <v-card-text
                v-if="currentEvent.attendees.length > 0"
                class="body-1"
              >
                <h5>Attendees</h5>
                <div class="stacked-av">
                  <v-avatar
                    v-for="(a, i) in currentEvent.attendees"
                    :key="i"
                    :title="a.name"
                    color="brown"
                  >
                    {{ a.name.charAt(0) }}
                    <!-- <span>{{ initials(a.name) }}</span> -->
                  </v-avatar>
                </div>
              </v-card-text>
            </template>
            <client-only>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  v-if="canEdit"
                  text
                  :to="`/events/${currentEvent.id}/manage`"
                >
                  Manage event
                </v-btn>
                <social-share
                  :url="`/events/${currentEvent.id}`"
                  :title="currentEvent.about"
                  :description="currentEvent.description"
                />
                <template v-if="!currentEvent.currentUserTicket">
                  <BuyTicket
                    v-if="!canEdit"
                    :past="currentEvent.past"
                    :tickets="currentEvent.tickets"
                  />
                </template>
                <template v-else>
                  <v-btn
                    color="primary"
                    depressed
                    large
                    rounded
                    :to="`/tickets/${currentEvent.currentUserTicket.id}`"
                  >
                    <v-icon left>
                      mdi-ticket-percent
                    </v-icon>
                    View your ticket
                  </v-btn>
                </template>
              </v-card-actions>
            </client-only>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="7">
              <h3 class="headline">
                About this event
              </h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="subtitle" v-html="currentEvent.description" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- End of event body -->
    </v-container>
  </div>
</template>
<script>
import SocialShare from '~/components/SocialShare.vue'
export default {
  components: { SocialShare },
  data () {
    return {
      availableTickets: [],
      eventRsvp: {
        ticket: {},
        rsvp_count: 1
      },
      currentEvent: {
        about: null,
        organiser: { name: null },
        tickets: []
      },
      registerDialog: false
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get(
        `/events/${this.$route.params.event}`
      )
      this.currentEvent = data
    } catch (error) {
      if (error.response.status === 500) {
        this.$router.push('/error')
      }
    }
  },
  head () {
    return {
      title: this.currentEvent ? this.currentEvent.about : 'Event',
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: this.currentEvent ? this.currentEvent.about : 'Event',
            startDate: this.currentEvent ? this.currentEvent.startDate : null,
            endDate: this.currentEvent ? this.currentEvent.endDate : null,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: this.currentEvent ? this.currentEvent.location : 'Online',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '37 Westlands road',
                addressLocality: 'Nairobi',
                postalCode: '30100',
                addressRegion: 'KE',
                addressCountry: 'KE'
              }
            },
            // location: {
            //   '@type': 'VirtualLocation',
            //   url: 'https://operaonline.stream5.com/'
            // },
            image: [`${this.currentEvent ? this.currentEvent.image : ''}`],
            description: this.currentEvent ? this.strippedDescription : '',
            offers: {
              '@type': 'Offer',
              url: `https://events254.co.ke/${
                this.currentEvent ? this.currentEvent.id : ''
              }`,
              price: this.currentEvent.tickets[0]
                ? this.currentEvent.tickets[0].price
                : 0,
              priceCurrency: 'KES',
              availability: 'https://schema.org/InStock',
              validFrom: `${
                this.currentEvent ? this.currentEvent.created_at : ''
              }`,
              validThrough: `${
                this.currentEvent ? this.currentEvent.endDate : ''
              }`
            },
            organizer: {
              '@type': 'Organization',
              name: this.currentEvent ? this.currentEvent.organiser.name : '',
              url: `https://events254.co.ke/${this.organiserLink}`
            }
          }
        }
      ],
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: this.strippedDescription
        },
        {
          property: 'og:title',
          content: this.currentEvent.about
        },
        {
          property: 'og:description',
          content: this.strippedDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.currentEvent.image
        },
        {
          property: 'twitter:title',
          content: this.currentEvent.about
        },
        {
          property: 'twitter:description',
          content: this.strippedDescription
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.currentEvent.image
        }
      ]
    }
  },
  computed: {
    differenceInDays () {
      return this.$moment(this.currentEvent.endDate).diff(
        this.$moment(this.currentEvent.startDate),
        'days'
      )
    },
    strippedDescription () {
      if (this.currentEvent.description) {
        return this.currentEvent.description.replace(/<\/?[^>]+(>|$)/g, '')
      }
      return ''
    },
    canEdit () {
      const user = this.$store.state.auth.user
      const event = this.currentEvent
      if (!user) {
        return false
      }
      if (event.organiser.type === 'user') {
        return event.organiser.id === user.id
      }
      if (!event.organiser.adminIds) {
        return false
      }
      const ids = event.organiser.adminIds.map(r => r.user_id)
      return ids.includes(user.id)
    },
    organiserLink () {
      const organiser = this.currentEvent.organiser
      if (organiser.type === 'user') {
        return `/u/${organiser.id}`
      }
      return `/${organiser.slug}`
    }
  },
  mounted () {
    if (this.$route.query.status) {
      const transactionId = this.$route.query.transaction_id
      this.verifyTransaction(transactionId)
    }
  },
  methods: {
    getTimeStringForSameDay (start, end) {
      const startTime = this.$moment(start).format('h:mm A')
      const endTime = this.$moment(end).format('h:mm A')
      if (startTime === endTime) {
        return `From ${startTime}`
      }
      return `From ${startTime} to ${endTime}`
    },
    getTimeStringForDifferentDay (start, end) {
      const startTime = this.$moment(start).format('ll')
      const endTime = this.$moment(end).format('ll')
      if (startTime === endTime) {
        return `From ${startTime}`
      }
      return `From ${startTime} to ${endTime}`
    },
    async verifyTransaction (transactionID) {
      try {
        const { data } = await this.$axios.get(
          `/payments/verify/${transactionID}`
        )
        await this.$axios.post(`/events/${this.$route.params.event}/register`, {
          ticket_id: data.data.meta.ticketId,
          rsvp_count: data.data.meta.ticketCount
        })
        this.$router.push('/home/tickets')
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  initClientOnlyComp (count = 10) {
    this.$nextTick(() => {
      if (this.$refs.myComp) {
        // ...
      } else if (count > 0) {
        this.initClientOnlyComp(count - 1)
      }
    })
  },
  auth: false
}
</script>
<style lang="scss" scoped>
.custom-dark {
  filter: opacity(40) !important;
}
.v-avatar {
  margin-right: -25px !important;
  border: 1px solid #fafafa !important;

  &:hover {
    z-index: 5;
  }
}
div {
  &.stacked-av {
    display: flex !important;
    overflow: scroll;
  }
}
</style>
