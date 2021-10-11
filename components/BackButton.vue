<template>
  <v-icon @click="goBack">
    mdi-arrow-left
  </v-icon>
</template>
<script>
export default {
  props: {
    path: {
      type: String,
      default: '/'
    }
  },
  methods: {
    goBack () {
      if (this.path !== '/') {
        this.$router.push(this.path)
        return
      }
      if (window.history && window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
