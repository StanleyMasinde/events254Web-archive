<template>
  <div>
    <client-only>
      <AppBar title="Calendar 📅" />
    </client-only>

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-card-title>

            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-btn
                    rounded
                    depressed
                    block
                    color="primary"
                    @click="setToday"
                  >
                    Today
                  </v-btn>
                </v-col>

                <v-col cols="12" sm="1">
                  <v-btn icon block @click="prev">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                </v-col>

                <v-col cols="12" sm="1">
                  <v-btn icon block @click="next">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-select
                    v-model="calendarType"
                    outlined
                    :items="[
                      { text: 'Week', value: 'week' },
                      { text: 'Month', value: 'month' },
                      { text: '4Day', value: '4day' },
                      { text: 'Day', value: 'day' },
                    ]"
                    label="View"
                  />
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-title>
              <span class="headline">Calendar</span>
            </v-card-title>
            <v-card-text>
              <v-calendar
                ref="calendar"
                v-model="focus"
                :events="events"
                :type="calendarType"
                @click:event="onClickEvent"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Dialog for event detail -->
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ selectedEvent.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-subheader>Start</v-subheader>
                <v-chip>
                  {{ selectedEvent.start }}
                </v-chip>
              </v-col>
              <v-col cols="12" sm="6">
                <v-subheader>End</v-subheader>
                <v-chip>
                  {{ selectedEvent.end }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-subheader>Location</v-subheader>
                <v-chip>
                  {{ selectedEvent.location }}
                </v-chip>
              </v-col>
              <v-col cols="12" sm="6">
                <v-subheader>Attendees</v-subheader>
                <v-chip> 0 </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" depressed @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              depressed
              large
              rounded
              color="accent"
              :to="`/events/${selectedEvent.id}`"
            >
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      events: [],
      calendarType: 'month',
      focus: '',
      dialog: false,
      selectedEvent: {},
      colors: [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#795548',
        '#9E9E9E',
        '#607D8B'
      ]
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/search/calendar')
      const evts = data
      this.events = evts.map((evt) => {
        const start = this.$moment(evt.startDate).format('YYYY-MM-DD HH:mm')
        const end = this.$moment(evt.endDate).format('YYYY-MM-DD HH:mm')
        const isAllDay = start === end
        const color = this.colors[Math.floor(Math.random() * this.colors.length)]
        return {
          id: evt.id,
          name: evt.about,
          start,
          end,
          timed: !isAllDay,
          location: evt.location,
          color
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  head () {
    return {
      title: this.$refs.calendar ? this.$refs.calendar.title : 'Calendar',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find events and bookings from our calendar'
        }
      ]
    }
  },

  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    async getCurrentMonth () {
      try {
        const { data } = await this.$axios.get(
          `/search/calendar/?date=${this.focus}`
        )
        this.events = data.map((evt) => {
          const start = this.$moment(evt.startDate).format('YYYY-MM-DD HH:mm')
          const end = this.$moment(evt.endDate).format('YYYY-MM-DD HH:mm')
          const isAllDay = start === end
          const color = this.colors[Math.floor(Math.random() * this.colors.length)]
          return {
            id: evt.id,
            name: evt.about,
            start,
            end,
            timed: !isAllDay,
            location: evt.location,
            color
          }
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    setToday () {
      this.focus = ''
      this.$fetch()
    },
    prev () {
      this.$refs.calendar.prev()
      this.getCurrentMonth()
    },
    next () {
      this.$refs.calendar.next()
      this.getCurrentMonth()
    },
    onClickEvent ({ event }) {
      this.selectedEvent = event
      this.dialog = true
    }
  },
  auth: false
}
</script>
