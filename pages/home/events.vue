<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" class="mt-3">
        <v-btn
          v-if="events.length > 0"
          block
          to="/events/create"
          depressed
          rounded
          color="primary"
        >
          Create a new event
          <v-icon right>
            mdi-calendar-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div v-if="events.length === 0" class="text-center">
      <p class="title">
        You have not created any events
      </p>
      <v-btn to="/events/create" depressed rounded color="primary">
        Create your first event
        <v-icon right>
          mdi-calendar-plus
        </v-icon>
      </v-btn>
    </div>
    <!-- A list of events -->
    <v-row v-else>
      <v-col
        v-for="(e,i) in events"
        :key="i"
        cols="12"
        md="6"
        sm="6"
      >
        <v-card
          class="ma-5"
          :to="`/events/${e.id}/manage`"
          flat
          outlined
        >
          <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" contain height="150" :src="e.image" />
          <v-card-text>
            <h3>{{ e.about }}</h3>
            <v-divider />
            <small> {{ $moment(e.start_date).format('MMMM Do YYYY') }}</small>
            <small> {{ $moment(e.start_date).format('h:mm a') }}</small>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      events: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/events/currentUser')
    this.events = data
  },
  head () {
    return {
      title: 'My events'
    }
  }
}
</script>
