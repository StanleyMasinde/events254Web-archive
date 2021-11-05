<template>
  <div>
    <FetchLoading v-if="$fetchState.pending" landing-page />
    <FetchError v-else-if="$fetchState.error" />
    <v-container v-else fluid>
      <div class="mt-5">
        <client-only>
          <edit-event :update-url="`/events/${currentEvent.id}`" :event="currentEvent" @success="$fetch()" />
        </client-only>
      </div>
    </v-container>
  </div>
</template>
<script>
import EditEvent from '~/components/EditEvent.vue'
export default {
  components: { EditEvent },
  data () {
    return {
      updatedEvent: {},
      currentEvent: {}
    }
  },
  async fetch () {
    if (process.client) {
      this.$http.setBaseURL(process.env.API_URL)
    }
    const { data } = await this.$axios.get(`/events/${this.$route.params.event}`)
    this.currentEvent = await data
  },
  computed: {
    eventData () {
      const [date] = new Date(this.currentEvent.from).toLocaleString().split(',')
      const m = this.$moment(this.currentEvent.from)
      const fromTime = `${m.hours()}:${m.minutes()}`
      return {
        type: this.currentEvent.type,
        title: this.currentEvent.about,
        from_date: date,
        from_time: fromTime,
        description: this.currentEvent.description
      }
    }
  }
}
</script>
