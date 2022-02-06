<template>
  <v-card flat>
    <div id="success-alert" />
    <v-alert
      v-if="successMessage"
      type="success"
      dismissible
    >
      {{ successMessage }}
    </v-alert>

    <v-alert v-if="errorMessage" type="error" dismissible>
      {{ errorMessage }}
    </v-alert>
    <v-card-text>
      <ValidationObserver v-slot="{ invalid }">
        <v-form @submit.prevent="updateProfile">
          <ValidationProvider v-slot="{ errors }" name="name" rules="required">
            <v-text-field
              v-model="currentUser.name"
              solo
              prepend-inner-icon="mdi-account-outline"
              label="Name"
              outlined
              flat
              :error-messages="errors"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" name="email" rules="required">
            <v-text-field
              v-model="currentUser.email"
              prepend-inner-icon="mdi-email-outline"
              readonly
              outlined
              solo
              label="Email"
              flat
              :error-messages="errors"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="username"
            rules="required"
          >
            <v-text-field
              v-model="currentUser.username"
              prepend-inner-icon="mdi-account-outline"
              outlined
              label="Username"
              flat
              solo
              :error-messages="errors"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="phone"
            rules="phone-min:10"
          >
            <v-text-field
              v-model="currentUser.phone"
              prepend-inner-icon="mdi-phone-outline"
              outlined
              label="Phone"
              flat
              solo
              :error-messages="errors"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" name="bio" rules="required">
            <v-textarea
              v-model="currentUser.bio"
              prepend-inner-icon="mdi-account-outline"
              outlined
              label="Bio"
              flat
              solo
              auto-grow
              rows="3"
              :error-messages="errors"
            />
          </ValidationProvider>
          <v-btn
            :disabled="invalid"
            block
            depressed
            large
            rounded
            color="primary"
            type="submit"
          >
            Update Profile
            <v-icon right>
              mdi-account-edit
            </v-icon>
          </v-btn>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      errorMessage: null,
      successMessage: null,
      currentUser: {
        name: '',
        username: '',
        email: '',
        phone: '',
        bio: ''
      }
    }
  },
  head () {
    return {
      title: 'My Profile'
    }
  },
  computed: {
    ...mapGetters(['authUser'])
  },
  mounted () {
    this.currentUser.name = this.authUser.name
    this.currentUser.username = this.authUser.username
    this.currentUser.email = this.authUser.email
    this.currentUser.phone = this.authUser.phone
    this.currentUser.bio = this.authUser.bio
  },
  methods: {
    async updateProfile () {
      try {
        await this.$axios.post('/users/update', this.currentUser)
        this.successMessage = 'Profile updated successfully'

        document.getElementById('success-alert').scrollIntoView({
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.successMessage = null
        }, 5000)
      } catch (error) {
        if (error.response?.status === 422) {
          this.errorMessage = error.response.data.message
          return
        }

        if (error.response?.status === 500) {
          this.errorMessage = 'Something went wrong'
          return
        }
        this.errorMessage = error.message
        setTimeout(() => {
          this.errorMessage = null
        }, 3000)
      }
    }
  }
}
</script>
