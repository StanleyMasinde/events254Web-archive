<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="10"
        class="mt-5"
      >
        <h3>Your Calendar</h3>
        <h5>Time: {{ liveTime }}</h5>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10" class="mt-3">
        <v-calendar type="week" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      liveTime: ''
    }
  },
  mounted () {
    this.liveTime = this.$moment().format('hh:mm:ss a')
    setInterval(() => {
      this.liveTime = this.$moment().format('hh:mm:ss a')
    }, 1000)
  }
}
</script>
