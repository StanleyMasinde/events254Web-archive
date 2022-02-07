<template>
  <div>
    <client-only>
      <AppBar title="Events254" :back="false" />
    </client-only>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card shaped outlined>
            <v-card-text>
              <ValidationObserver v-slot="{ invalid }">
                <v-form @submit.prevent="sendMessage">
                  <ValidationProvider v-slot="{ errors }" rules="required" name="email">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      outlined
                      prepend-inner-icon="mdi-email-outline"
                      color="primary"
                      :error-messages="errors"
                    />
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" name="category" rules="required">
                    <v-select
                      v-model="message.category"
                      :items="categories"
                      label="Category"
                      outlined
                      color="primary"
                      required
                      prepend-inner-icon="mdi-format-list-bulleted-square"
                      :error-messages="errors"
                    />
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" name="Message" rules="required">
                    <v-textarea
                      v-model="message.message"
                      :error-messages="errors"
                      label="Message"
                      outlined
                      color="primary"
                      required
                      rows="5"
                      auto-grow
                      prepend-inner-icon="mdi-comment-text-outline"
                    />
                  </ValidationProvider>

                  <v-btn
                    block
                    x-large
                    color="primary"
                    type="submit"
                    :disabled="invalid"
                    depressed
                    rounded
                  >
                    Send Message
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
  auth: false,
  data () {
    return {
      categories: [
        'Account Creation',
        'Account Deletion',
        'Event Creation',
        'Event Deletion',
        'Ticket sales',
        'Other'
      ],
      message: {
        category: null,
        message: null
      }
    }
  }
}
</script>
