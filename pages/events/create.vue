<template>
  <div>
    <v-app-bar flat>
      <v-toolbar-title>
        <back-button />
        <span class="title">Create Event</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row justify="center">
        <SideNavigation />

        <v-col cols="12" lg="9" xl="10">
          <v-row justify="center">
            <v-col cols="12" md="8">
              <CreateEvent />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
