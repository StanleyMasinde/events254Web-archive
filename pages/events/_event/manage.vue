<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <v-btn icon exact :to="`/events/${$route.params.event}`">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        Managing {{ currentEvent.about }}
      </v-toolbar-title>
    </v-app-bar>

    <v-container fluid>
      <div v-if="!currentEvent.can_edit" class="error-page">
        <v-img src="/403.svg" height="100%">
          <h1 class="display-1">
            You are not authorized to view this page
          </h1>
        </v-img>
      </div>
      <template v-else>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-btn
              large
              title="Click to publish or unpublish this event"
              depressed
              :color="currentEvent.published === 1 ? 'green': 'primary'"
              rounded
              @click="togglePublishing"
            >
              {{ currentEvent.published === 1 ? 'Published': 'Draft' }}
            </v-btn>
            <v-btn
              large
              title="Delete this event"
              icon
              color="error"
              depressed
              rounded
              @click="deleteEventDialog = true"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn large title="View event like the same way users see it" rounded text :to="`/events/${$route.params.event}`">
              View event
            </v-btn>
          </v-col>
          <v-col cols="12" lg="8">
            <v-tabs centered grow>
              <v-tab :to="`/events/${$route.params.event}/manage`">
                General information
              </v-tab>
              <v-tab :to="`/events/${$route.params.event}/manage/ticket`">
                Tickets
              </v-tab>
              <v-tab :to="`/events/${$route.params.event}/manage/rsvps`">
                RSVPs
              </v-tab>
            </v-tabs>
            <nuxt-child />
          </v-col>
        </v-row>
      </template>
    </v-container>

    <!--- Modals --->
    <v-dialog v-model="deleteEventDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this event?
        </v-card-title>
        <v-card-text>
          This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="deleteEventDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" text @click="deleteEvent">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentEvent: {},
      deleteEventDialog: false
    }
  },
  async fetch () {
    if (process.client) {
      this.$http.setBaseURL(process.env.API_URL)
    }
    const { data } = await this.$axios.get(
      `/events/${this.$route.params.event}`
    )
    this.currentEvent = data
  },
  methods: {
    async togglePublishing () {
      try {
        const { data } = await this.$axios.put(`/events/${this.$route.params.event}/publish`, {
          published: this.currentEvent.published === 1 ? 0 : 1
        })
        this.currentEvent.published = data.published
      } catch (error) {
        this.$sentry.captureException(error)
      }
    },
    async deleteEvent () {
      try {
        await this.$axios.delete(`/events/${this.$route.params.event}`)
        this.$router.push('/home')
      } catch (error) {
        this.$sentry.captureException(error)
      }
    }
  }
}
</script>
<style lang="scss">
.error-page {
  height: 89vh;
  text-align: center;
  h1 {
    color: #ffffff;
    text-shadow: 3px 3px 7px #585757;
  }
}
</style>
