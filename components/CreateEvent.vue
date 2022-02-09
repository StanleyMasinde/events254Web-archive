<template>
  <div>
    <client-only>
      <v-alert v-if="message.success" type="success">
        Event created
      </v-alert>
      <div v-show="!showPreviewPage">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-form ref="form" @submit.prevent="createEvent">
            <v-card flat outlined style="width: 100vw" class="mb-2">
              <v-card-text>
                <v-text-field
                  v-model="event.about"
                  style="font-weight: 800"
                  filled
                  rounded
                  placeholder="Title"
                  autofocus
                />
                <v-row>
                  <v-col>
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <DateInput
                        v-model="event.startDate"
                        :error-messages="errors"
                        name="startDate"
                        label="Start"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col v-if="!isAllDay">
                    <TimeInput v-model="event.startTime" name="startTime" />
                  </v-col>
                </v-row>

                <v-row v-if="hasEndDate">
                  <v-col>
                    <DateInput
                      v-model="event.endDate"
                      name="endDate"
                      label="End"
                      value=""
                    />
                  </v-col>
                  <v-col v-if="!isAllDay">
                    <TimeInput v-model="event.endTime" name="endTime" />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="text-right">
                <v-checkbox
                  v-model="isAllDay"
                  hint="If the event has no end time"
                  label="All day"
                />
                <v-checkbox
                  v-model="hasEndDate"
                  hint="If the event has no end time"
                  label="Add end date"
                />
              </v-card-actions>
            </v-card>

            <v-text-field
              v-if="!isVirtual"
              v-model="event.location"
              class="ma-0"
              autocomplete="address-level1"
              placeholder="Location"
              rounded
              filled
              prepend-inner-icon="mdi-map-marker"
            />
            <v-text-field
              v-else
              v-model="event.online_link"
              class="ma-0"
              autocomplete="url"
              placeholder="Meeting link"
              rounded
              filled
              type="url"
              hint="You can add this later"
              prepend-inner-icon="mdi-link"
            />
            <v-checkbox
              v-model="isVirtual"
              class="ma-0"
              hint="If the event is online"
              label="It is a virtual event"
            />

            <RichEditor v-model="event.description" />
            <v-btn
              large
              depressed
              rounded
              color="primary"
              :disabled="invalid"
              @click="showPreviewPage = true"
            >
              Next
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-form>
        </ValidationObserver>
      </div>
      <!-- Show the event preview -->
      <div v-show="showPreviewPage">
        <v-img class="white--text" height="400" contain :src="event.image ? event.image:'/icon.png'">
          <div class="event-preview">
            <div>
              <form id="eventForm">
                <ImageUpload name="image" @change="onImageInputChage" />
              </form>
            </div>
            <div class="preview-about">
              {{ event.about || 'Event title' }}
            </div>

            <div class="preview-date">
              {{ timeDateString }}
            </div>
          </div>
        </v-img>

        <v-btn
          class="mt-5"
          color="primary"
          depressed
          block
          x-large
          rounded
          @click="createEvent"
        >
          Create Event
        </v-btn>
      </div>
    </client-only>
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
      isAllDay: false,
      hasEndDate: false,
      isVirtual: false,
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
  computed: {
    timeDateString () {
      const startDate = this.event.startDate || this.$moment()
      const endDate = this.event.endDate

      return this.$moment(startDate).format('dddd, MMMM Do YYYY') +
        (this.hasEndDate ? ' - ' + this.$moment(endDate).format('dddd, MMMM Do YYYY') : '')
    }
  },
  methods: {
    onImageInputChage (e) {
      const url = URL.createObjectURL(e)
      URL.createObjectURL(e)
      this.event.image = url
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
  background-image: linear-gradient(
    to top,
    #0000008e 0%,
    transparent 772px
  );
}

</style>
