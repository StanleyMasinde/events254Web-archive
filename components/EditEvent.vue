<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-form>
          <v-text-field label="About" outlined />

          <v-row>
            <v-col>
              <v-text-field outlined type="date" label="Start date" />
            </v-col>
            <v-col>
              <v-text-field outlined label="Time" type="time" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field outlined type="date" label="End date" />
            </v-col>
            <v-col>
              <v-text-field outlined label="End time" type="time" />
            </v-col>
          </v-row>

          <v-text-field label="Location" outlined />

          <v-text-field label="Online link" outlined />

          <v-textarea label="Description" auto-grow rows="2" outlined />

          <v-btn depressed large rounded color="primary">
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
      default: '/events'
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
    async createEvent () {
      const form = document.querySelector('#eventForm')
      const formData = new FormData(form)
      formData.append('about', this.event.about)
      formData.append('description', this.event.description || this.event.about)
      formData.append('startDate', this.event.startDate)
      formData.append('startTime', this.event.startTime)
      formData.append('endDate', this.event.endDate || this.startDate)
      formData.append('endTime', this.event.endTime || '00:00')
      formData.append('location', this.event.location || 'N/A')
      formData.append('online_link', this.event.online_link || 'N/A')
      try {
        const { data } = await this.$axios.post(this.createUrl, formData)
        this.message.success = true
        this.$router.push(`/events/${data.id}/manage`)
      } catch (error) {
        if (error.response.status === 422) {
          this.$refs.observer.setErrors(error.response.data.errors)
          return
        }
        // TODO add proper handling
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
