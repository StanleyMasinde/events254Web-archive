<template>
  <div>
    <v-alert v-if="err" type="error">
      {{ err }}
    </v-alert>

    <v-alert v-if="success" type="success">
      {{ success }}
    </v-alert>
    <h3 class="headline">
      Reset Password
    </h3>
    <br>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form ref="form" @submit.prevent="resetPassword()">
        <ValidationProvider name="email" rules="required|email">
          <v-text-field v-model="email" name="email" rounded outlined label="Email" />
        </ValidationProvider>
        <v-btn :disabled="invalid" type="submit" color="accent">
          Send Reset Email
        </v-btn>
        <v-btn text to="/login" color="primary">
          Sign In
        </v-btn>
        <v-btn text to="/register" color="primary">
          Sign up
        </v-btn>
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
      err: null,
      email: null,
      success: null
    }
  },
  head: {
    title: 'Reset Password',
    meta: [
      { hid: 'description', name: 'description', content: 'Reset Your Password' }
    ]
  },
  methods: {
    async resetPassword () {
      try {
        const { data } = await this.$axios
          .post('/auth/password', { email: this.email })

        this.$refs.form.reset()
        this.$refs.observer.reset()
        this.success = data
      } catch (error) {
        this.err = error.response.data
        setTimeout(() => {
          this.err = null
        }, 5000)
      }
    }
  }
}
</script>
