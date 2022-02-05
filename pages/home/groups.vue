<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" class="mt-3">
        <v-btn to="/groups/create" depressed block rounded color="primary">
          Start a new group
          <v-icon right>
            mdi-account-multiple
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="groups.length === 0">
      <v-col cols="12">
        <div class="text-center">
          <p class="title">
            Start a new group
          </p>
          <v-btn to="/groups/create" depressed rounded color="primary">
            Create a group to get started
            <v-icon right>
              mdi-account-multiple
            </v-icon>
          </v-btn>
          <NoData />
        </div>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="(g, i) in groups" :key="i" cols="12" md="6" sm="6">
        <v-card :to="`/${g.slug}`" outlined class="mb-1">
          <v-img height="150" :src="g.pictureUrl" />
          <v-card-title>
            {{ g.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      groups: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/groups/currentUser')
      this.groups = data
    } catch (error) {
      throw new Error(error)
    }
  }
}
</script>
