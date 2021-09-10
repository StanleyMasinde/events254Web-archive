<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-form id="eventForm" @submit.prevent="updateEvent">
          <v-text-field v-model="eventForm.about" label="About" outlined />

          <v-row>
            <v-col>
              <v-text-field v-model="eventForm.startDate" outlined type="date" label="Start date" />
            </v-col>
            <v-col>
              <v-text-field v-model="eventForm.startTime" outlined label="Time" type="time" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field v-model="eventForm.endDate" outlined type="date" label="End date" />
            </v-col>
            <v-col>
              <v-text-field v-model="eventForm.endTime" outlined label="End time" type="time" />
            </v-col>
          </v-row>

          <v-text-field v-model="eventForm.location" label="Location" outlined />

          <v-text-field v-model="eventForm.online_link" label="Online link" outlined />

          <v-textarea v-model="eventForm.description" label="Description" auto-grow rows="2" outlined />

          <v-btn depressed type="submit" large rounded color="primary">
            Update event
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    updateUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showPreviewPage: false,
      isAllDay: false,
      hasEndDate: false,
      isVirtual: false,
      message: {
        success: null,
        err: null
      },
      eventForm: {
        image: null,
        location: null,
        online_link: null,
        about: null,
        description: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      }
    }
  },
  head () {
    return {
      title: 'Create a new Event'
    }
  },
  mounted () {
    this.isAllDay = this.event.allDay
    this.eventForm.startDate = new Date(this.event.startDate).toISOString().substr(0, 10)
    this.eventForm.startTime = new Date(this.event.startDate).toISOString().substr(11, 5)
    this.hasEndDate = this.event.endDate
    this.eventForm.image = this.event.image
    if (this.hasEndDate) {
      this.eventForm.endDate = new Date(this.event.endDate).toISOString().substr(0, 10)
      this.eventForm.endTime = new Date(this.event.endDate).toISOString().substr(11, 5)
    }
    this.eventForm.about = this.event.about
    this.eventForm.location = this.event.location
    this.eventForm.online_link = this.event.online_link
    this.eventForm.description = this.event.description
  },
  methods: {
    onImageInputChage (e) {
      const url = URL.createObjectURL(e)
      URL.createObjectURL(e)
      this.eventFrom.image = url
    },
    async updateEvent () {
      const form = document.querySelector('#eventForm')
      const formData = new FormData(form)
      formData.append('about', this.eventForm.about)
      formData.append('description', this.eventForm.description || this.event.about)
      formData.append('startDate', this.eventForm.startDate)
      formData.append('startTime', this.eventForm.startTime)
      formData.append('endDate', this.eventForm.endDate || this.startDate)
      formData.append('endTime', this.eventForm.endTime || '00:00')
      formData.append('location', this.eventForm.location || 'N/A')
      formData.append('online_link', this.eventForm.online_link || 'N/A')
      try {
        await this.$axios.put(this.updateUrl, formData)
        this.message.success = true
        this.$emit('success')
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.$refs.observer.setErrors(error.response.data.errors)
            return
          }
        }
        this.$sentry.captureException(error)
        throw new Error(error)
      }
    }
  }
}
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    #0000008e 0%,
    transparent 772px
  );
}

</style>
