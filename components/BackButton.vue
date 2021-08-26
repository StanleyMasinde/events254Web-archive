<template>
  <v-btn icon large @click="goBack">
    <v-icon>
      mdi-arrow-left
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  methods: {
    goBack () {
      // If window history is available, go back
      if (window.history && window.history.length > 1) {
        this.$router.go(-1)
      } else {
        // Otherwise, use fallback
        this.$router.push('/')
      }
    }
  }
}
</script>
