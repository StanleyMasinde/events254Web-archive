<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <back-button />
        {{ user.name || "Events 254" }}
      </v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row v-if="$fetchState.pending" justify="center">
        <h1>Loading</h1>
      </v-row>

      <!-- Something went wrong! 😭 -->
      <v-row v-else-if="$fetchState.error">
        <div class="full-height">
          <v-img height="300" contain src="/not_found.svg">
            <v-container>
              <v-row justify="center">
                <v-col cols="12" md="8">
                  <h1 class="display-1 gray--text">
                    Sorry 😢 There's nothing here
                  </h1>
                  <v-btn text x-large color="primary" to="/"> Go home </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </div>
      </v-row>
      <!-- End of error -->

      <!-- Success! -->
      <!-- User public info with avatar and list of events organized -->
      <v-row v-else>
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-avatar height="100" width="100" color="brown">
                    <span class="white--text display-3">{{ innitials }}</span>
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="8">
                  <h1 class="display-1">
                    {{ user.name }}
                  </h1>
                  <h2 class="subheading">
                    {{ user.username }}
                  </h2>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <h3>Events by {{ user.name }}</h3>
              <v-list>
                <v-card
                  v-for="event in user.events"
                  :key="event.id"
                  class="mb-2"
                  outlined
                  :to="'/events/' + event.id"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ event.about }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- End of success -->
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  async fetch() {
    if (process.client) {
      this.$http.setBaseURL(process.env.API_URL);
    }
    try {
      const { data } = await this.$axios.get(`/users/${this.$route.params.id}`);
      this.user = data;
    } catch (error) {
      this.$sentry.captureException(error);
      throw new Error(error);
    }
  },
  head() {
    return {
      title: this.user.name || "Events254",
      meta: [
        {
          property: "og:title",
          content: this.user.name,
        },
        {
          property: "og:description",
          content: this.user.bio || this.user.name,
        },
      ],
      script: [
        {
          type: "application/ld+json",
          json: {
            "@context": "http://schema.org",
            "@type": "Person",
            name: this.user.name,
            url: `https://events254.co.ke/u/${this.user.id}`,
            image: this.user.avatar,
            description: this.user.bio || this.user.name,
          },
        },
      ],
    };
  },
  auth: false,
  computed: {
    innitials() {
      if (!this.user.name) {
        return;
      }
      const [firstName, lastName] = this.user.name.split(" ");
      if (!lastName) {
        return `${firstName.split("")[0]}`;
      }
      return `${firstName.split("")[0]}${lastName.split("")[0]}`;
    },
  },
};
</script>
