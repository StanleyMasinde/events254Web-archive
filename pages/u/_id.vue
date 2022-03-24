<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <back-button />
        {{ user.name || "Events 254" }}
      </v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row>
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
  async asyncData ({ params, $axios }) {
    try {
      const { data } = await $axios.get(`/users/${params.id}`)
      return { user: data }
    } catch (error) {
      throw new Error(error)
    }
  },
  head () {
    return {
      title: this.user.name || 'Events254',
      meta: [
        {
          property: 'og:title',
          content: this.user.name
        },
        {
          property: 'og:description',
          content: this.user.bio || this.user.name
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org',
            '@type': 'Person',
            name: this.user.name,
            url: `https://events254.co.ke/u/${this.user.id}`,
            image: this.user.avatar,
            description: this.user.bio || this.user.name
          }
        }
      ]
    }
  },
  auth: false,
  computed: {
    innitials () {
      if (!this.user.name) {
        return
      }
      const [firstName, lastName] = this.user.name.split(' ')
      if (!lastName) {
        return `${firstName.split('')[0]}`
      }
      return `${firstName.split('')[0]}${lastName.split('')[0]}`
    }
  }
}
</script>
