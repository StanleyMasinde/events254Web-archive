<template>
  <div>
    <AppBar title="Create event" />

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
