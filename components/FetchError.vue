<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="text-center">
      <h1 class="display-1">
        Ooops!
      </h1>
      <p class="body-1">
        We are having trouble loading the content. Please try again later.
      </p>
    </v-col>

    <v-col cols="12" class="text-center">
      <v-img
        :src="'/no_data.svg'"
        height="150"
        contain
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
