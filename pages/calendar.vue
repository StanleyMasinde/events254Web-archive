<template>
  <v-container>
    <NavigatorBar title="Calendar" />
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card outlined>
          <v-card-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-card-title>

          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="4">
                <v-btn rounded block color="primary" dark @click="setToday">
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
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      events: [],
      calendarType: 'month',
      focus: ''
    }
  },
  async fetch () {
    if (process.client) {
      this.$http.setBaseURL(process.env.API_URL)
    }
    try {
      const data = await this.$http.get('/search/calendar')
      const evts = await data.json()
      this.events = evts.map((evt) => {
        const start = this.$moment(evt.startDate).format('YYYY-MM-DD HH:mm')
        const end = this.$moment(evt.endDate).format('YYYY-MM-DD HH:mm')
        const isAllDay = start === end
        return {
          name: evt.about,
          start,
          end,
          timed: !isAllDay
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  head () {
    return {
      title: 'Calendar'
    }
  },

  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    async getCurrentMonth () {
      try {
        const data = await this.$http.get(`/search/calendar/?date=${this.focus}`)
        const evts = await data.json()
        this.events = evts.map((evt) => {
          const start = this.$moment(evt.startDate).format('YYYY-MM-DD HH:mm')
          const end = this.$moment(evt.endDate).format('YYYY-MM-DD HH:mm')
          const isAllDay = start === end
          return {
            name: evt.about,
            start,
            end,
            timed: !isAllDay
          }
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
      this.getCurrentMonth()
    },
    next () {
      this.$refs.calendar.next()
      this.getCurrentMonth()
    }
  },
  auth: false
}
</script>
