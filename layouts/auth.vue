<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="fullPage" justify="center" align="center">
          <v-col cols="10" md="6">
            <v-img
              height="300"
              contain
              alt="Events254 Logo"
              src="/lighthouse.svg"
              @click="$router.push('/')"
            />
          </v-col>
          <v-col cols="10" md="6">
            <!-- Social Logins -->
            <!-- <v-btn
              dark
              rounded
              depressed
              large
              block
              color="#4267B2"
              @click="$auth.loginWith('facebook')"
            >
              <v-icon left>
                mdi-facebook
              </v-icon>
              Facebook
            </v-btn>

            <v-btn
              dark
              rounded
              depressed
              large
              block
              color="#D34836"
              @click="$auth.loginWith('google')"
            >
              <v-icon left>
                mdi-google
              </v-icon>
              Google
            </v-btn> -->
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="scss" scoped>
.fullPage {
  height: 90vh;
}
</style>
