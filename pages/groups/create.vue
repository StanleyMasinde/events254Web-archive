<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <back-button />
        Start a new group
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="7">
          <v-card outlined>
            <v-card-text>
              <ValidationObserver ref="formObserver" v-slot="{ invalid }">
                <v-form id="groupForm" @submit.prevent="createGroup">
                  <ValidationProvider
                    ref="form"
                    v-slot="{ errors }"
                    name="picture"
                    rules="required"
                  >
                    <v-file-input
                      v-model="group.picture"
                      name="picture"
                      :error-messages="errors"
                      accept="image/*"
                      label="Your group image"
                      hint="Please upload a square image"
                      outlined
                      prepend-inner-icon="mdi-image"
                      prepend-icon=""
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="group.name"
                      name="name"
                      :error-messages="errors"
                      label="Name your group"
                      outlined
                      hint="What do you want to call your group?"
                      prepend-inner-icon="mdi-account-group"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <v-textarea
                      v-model="group.description"
                      name="description"
                      :error-messages="errors"
                      outlined
                      label="What is your group about?"
                      hint="Give a detailed description of your group"
                      prepend-inner-icon="mdi-comment-text-outline"
                      auto-grow
                      rows="3"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="country"
                    rules="required"
                  >
                    <v-text-field
                      v-model="group.country"
                      name="country"
                      :error-messages="errors"
                      readonly
                      label="Country"
                      outlined
                      hint="Where is your group located?"
                      prepend-inner-icon="mdi-map-marker"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="city"
                    rules="required"
                  >
                    <v-text-field
                      v-model="group.city"
                      name="city"
                      :error-messages="errors"
                      outlined
                      label="City"
                      hint="What city is your group located in?"
                      prepend-inner-icon="mdi-city"
                    />
                  </ValidationProvider>
                  <v-btn type="submit" color="primary" :disabled="invalid">
                    <v-icon left>
                      mdi-check
                    </v-icon>
                    Create group
                  </v-btn>
                </v-form>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      group: {
        picture: null,
        name: null,
        description: null,
        country: 'Kenya',
        city: 'Nairobi'
      }
    }
  },
  head () {
    return {
      title: 'Create group/company'
    }
  },
  methods: {
    async createGroup () {
      const form = document.querySelector('#groupForm')
      const groupData = new FormData(form)
      try {
        const { data } = await this.$axios.post('/groups', groupData)
        this.$router.push(`/${data.slug}`)
      } catch (error) {
        if (error.response.status === 422) {
          return this.$refs.formObserver.setErrors(error.response.data.errors)
        }
        throw new Error(error)
      }
    }
  }
}
</script>
