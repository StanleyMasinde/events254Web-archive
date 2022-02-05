<template>
  <div>
    <h3 class="headline">
      Register
    </h3>
    <br>
    <v-alert
      v-if="errorMessage"
      type="error"
      dismissible
    >
      {{ errorMessage }}
    </v-alert>

    <ValidationObserver ref="form" v-slot="{ invalid }">
      <v-form @submit.prevent="register">
        <ValidationProvider v-slot="{ errors }" name="name" rules="required">
          <v-text-field
            v-model="user.name"
            name="name"
            :error-messages="errors"
            label="Full Name"
            outlined
            prepend-inner-icon="mdi-account"
            autocomplete="name"
          />
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
          <v-text-field
            v-model="user.email"
            name="email"
            :error-messages="errors"
            type="email"
            outlined
            label="Email Address"
            prepend-inner-icon="mdi-email"
          />
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="password" rules="required">
          <v-text-field
            v-model="user.password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="errors"
            outlined
            label="Password"
            prepend-inner-icon="mdi-lock"
            autocomplete="new-password"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showPassword = !showPassword"
          />
        </ValidationProvider>

        <v-btn
          :disabled="invalid"
          block
          type="submit"
          rounded
          x-large
          color="accent"
        >
          Sign up
          <v-icon right>
            mdi-account-plus
          </v-icon>
        </v-btn>

        <v-card-actions>
          <v-btn text color="primary" href="/login">
            Sign in
          </v-btn>
          Or
          <v-btn text to="/password/reset" color="primary">
            Reset Password
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  auth: 'guest',
  layout: 'auth',
  data () {
    return {
      showPassword: false,
      errorMessage: null,
      user: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  head: {
    title: 'Sign up',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Create your free Events254 account today'
      },
      {
        property: 'og:title',
        content: 'Sign up'
      },
      {
        property: 'og:description',
        content: 'Create your free Events254 account today'
      }
    ]

  },
  methods: {
    async register () {
      try {
        await this.$axios.post('/auth/register', this.user)
        await this.$auth.loginWith('cookie', {
          data: this.user
        })
        this.$router.push(this.$store.state.auth.redirect || '/home')
      } catch (error) {
        if (error.response.status === 422) {
          this.$refs.form.setErrors(error.response.data.errors)
          return
        }
        if (error.response.data) {
          this.errorMessage = error.response.data.message
          return
        }
        // TODO add proper handling
        throw new Error(error)
      }
    }
  }
}
</script>
