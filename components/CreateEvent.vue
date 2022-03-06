<template>
  <div>
    <v-row>
      <v-col>
        <h2>Create a new event</h2>
      </v-col>
    </v-row>

    <v-stepper v-model="step" flat outlined>
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1" :step-key="1">
          Select event type
        </v-stepper-step>

        <v-stepper-step :complete="step > 2" step="2" :step-key="2">
          Add event details
        </v-stepper-step>

        <v-stepper-step :complete="step > 3" step="3" :step-key="3">
          Select event category
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row justify="center">
            <v-col cols="6">
              <v-card
                class="mt-3"
                hover
                flat
                min-height="175"
                max-height="175"
                @click="setEventAttendanceMode('inPerson')"
              >
                <v-img src="/in_person.svg" height="100" contain />
                <v-card-text class="text-center">
                  <h3>In Person event</h3>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card
                class="mt-3"
                hover
                flat
                min-height="175"
                max-height="175"
                @click="setEventAttendanceMode('virtual')"
              >
                <v-img src="/virtual.svg" height="100" contain />
                <v-card-text class="text-center">
                  <h3>Virtual event</h3>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row justify="center">
            <v-col class="texr-center">
              <ValidationObserver v-slot="{ invalid }">
                <v-card-text>
                  <h3>
                    Creating
                    {{
                      event.attendanceMode === "inPerson"
                        ? "an in Person"
                        : "a virtual"
                    }}
                    event
                  </h3>
                  <v-form>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="about"
                    >
                      <v-text-field
                        v-model="event.about"
                        label="What is the event about?"
                        :error-messages="errors.about"
                        required
                        autocomplete="none"
                        solo
                        rounded
                        flat
                        class="display-1"
                      />
                    </ValidationProvider>

                    <v-divider />

                    <div class="mb-3">
                      <v-row align="center" justify="center">
                        <v-col cols="1">
                          <v-icon>mdi-calendar-clock</v-icon>
                        </v-col>

                        <v-col cols="9" class="body-1">
                          All day
                        </v-col>

                        <v-col cols="2">
                          <v-switch
                            v-model="event.isAllDay"
                            inset
                            class="display-1"
                          />
                        </v-col>
                      </v-row>

                      <v-row justify="center" align="center">
                        <v-col cols="5">
                          <span ref="startDate" class="title" @click="showStartDatePicker">{{ $moment(event.startDate).format("MMM DD, YYYY") }}</span>
                        </v-col>

                        <v-col cols="2" />

                        <v-col cols="5" class="text-right">
                          <span ref="endDate" class="title" @click="showEndDatePicker">{{ $moment(event.endDate).format("MMM DD, YYYY") }}</span>
                        </v-col>
                      </v-row>

                      <v-row v-if="!event.isAllDay" no-gutters justify="center" align="center">
                        <v-col class="title mt-n2 mb-n8" cols="2">
                          →
                        </v-col>
                      </v-row>

                      <v-row v-if="!event.isAllDay" justify="center">
                        <v-col cols="5">
                          <span ref="startTime" class="title" @click="showStartTimePicker">{{ event.startTime }}</span>
                        </v-col>

                        <v-col cols="2" />

                        <v-col cols="5" class="text-right">
                          <span ref="endTime" class="title" @click="showEndTimePicker">{{ event.endTime }}</span>
                        </v-col>
                      </v-row>

                      <v-date-picker v-if="startDatePicker" v-model="event.startDate" full-width />
                      <v-time-picker v-if="startTimePicker" v-model="event.startTime" full-width />
                      <v-date-picker v-if="endDatePicker" v-model="event.endDate" full-width />
                      <v-time-picker v-if="endTimePicker" v-model="event.endTime" full-width />
                    </div>
                    <v-divider />
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" depressed @click="step = 1">
                    <v-icon>mdi-chevron-left</v-icon>
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    depressed
                    :disabled="invalid"
                    @click="step = 3"
                  >
                    Next
                    <v-icon right>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </ValidationObserver>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  props: {
    createUrl: {
      type: String,
      default: '/events'
    }
  },
  data () {
    return {
      showPreviewPage: false,
      step: 1,
      isAllDay: false,
      hasEndDate: false,
      isVirtual: false,
      startDatePicker: false,
      startTimePicker: false,
      endDatePicker: false,
      endTimePicker: false,
      message: {
        success: null,
        err: null
      },
      event: {
        image: null,
        location: null,
        online_link: null,
        about: null,
        description: null,
        startDate: this.$moment().format('YYYY-MM-DD'),
        startTime: this.$moment().add(0.5, 'hours').format('HH:mm'),
        endDate: this.$moment().add(1, 'h').format('YYYY-MM-DD'),
        endTime: this.$moment().add(1, 'h').format('HH:mm'),
        attendance_mode: null
      }
    }
  },
  head () {
    return {
      title: 'Create a new Event'
    }
  },
  computed: {
    timeDateString () {
      const startDate = this.event.startDate || this.$moment()
      const endDate = this.event.endDate

      return (
        this.$moment(startDate).format('dddd, MMMM Do YYYY') +
        (this.hasEndDate
          ? ' - ' + this.$moment(endDate).format('dddd, MMMM Do YYYY')
          : '')
      )
    }
  },
  methods: {
    showStartDatePicker () {
      this.startDatePicker = true
      this.startTimePicker = false
      this.endDatePicker = false
      this.endTimePicker = false
    },
    showStartTimePicker () {
      this.startDatePicker = false
      this.startTimePicker = true
      this.endDatePicker = false
      this.endTimePicker = false
    },
    showEndDatePicker () {
      this.startDatePicker = false
      this.startTimePicker = false
      this.endDatePicker = true
      this.endTimePicker = false
    },
    showEndTimePicker () {
      this.startDatePicker = false
      this.startTimePicker = false
      this.endDatePicker = false
      this.endTimePicker = true
    },
    setEventAttendanceMode (mode) {
      this.event.attendance_mode = mode
      this.step = 2
    },
    onImageInputChage (e) {
      const url = URL.createObjectURL(e)
      URL.createObjectURL(e)
      this.event.image = url
    },
    async createEvent () {
      const form = document.querySelector('#eventForm')
      const formData = new FormData(form)
      formData.append('about', this.event.about)
      formData.append(
        'description',
        this.event.description || this.event.about
      )
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
.event-preview {
  background: #16161685;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: grid;
  grid-template-rows: 3fr 40px 100px;
  padding-left: 10px;
}

.preview-about {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: start;
}

.preview-date {
  color: rgb(204, 0, 0);
}

.bottom-gradient {
  background-image: linear-gradient(to top, #0000008e 0%, transparent 772px);
}
</style>
