<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon>
      <BackButton v-if="back" />
      <v-img
        v-else
        src="/icon.png"
        height="30"
        width="30"
      />
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items v-if="$vuetify.breakpoint.lgAndUp">
      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon to="/notifications">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon to="/home">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Events 254'
    },
    back: {
      type: Boolean,
      default: true
    }
  }
}
</script>
