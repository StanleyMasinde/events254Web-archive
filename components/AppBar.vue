<template>
  <div>
    <template v-if="$vuetify.breakpoint.lgAndUp">
      <v-toolbar color="primary" fixed flat>
        <v-row justify="center" align="center">
          <v-col cols="12" md="8">
            <v-row align="center" justify="space-around">
              <v-col>
                <v-app-bar-title>
                  <v-img src="/icon.png" height="60" width="60" contain />
                </v-app-bar-title>
              </v-col>

              <v-spacer />
              <v-col />

              <v-col>
                <v-btn to="/" depressed icon exact>
                  <v-icon>mdi-home</v-icon>
                </v-btn>

                <v-btn icon to="/notifications">
                  <v-icon>mdi-bell</v-icon>
                </v-btn>

                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-avatar size="50" v-bind="attrs" v-on="on">
                      <v-icon>mdi-menu</v-icon>
                    </v-avatar>
                  </template>

                  <v-card width="290">
                    <v-list-item to="/home" exact>
                      <v-list-item-icon>
                        <v-icon>mdi-account-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title> Profile </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/calendar" exact>
                      <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Public calendar</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/events/create" exact>
                      <v-list-item-icon>
                        <v-icon>mdi-plus-circle-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title> Create event </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/groups/create" exact>
                      <v-list-item-icon>
                        <v-icon>mdi-plus-circle-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title> Start a group </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider />

                    <v-list-item @click="$auth.logout()">
                      <v-list-item-icon>
                        <v-icon>mdi-exit-to-app</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title> Logout </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-toolbar>
    </template>

    <template v-else>
      <v-app-bar flat color="primary">
        <v-app-bar-nav-icon>
          <BackButton v-if="back" />
          <v-img v-else src="/icon.png" height="30" width="30" />
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
  </div>
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
