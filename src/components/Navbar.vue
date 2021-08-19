<template>
  <nav class="mb-5">
    <v-app-bar style="background-color: transparent;" elevate-on-scroll>
      <v-container class="d-flex align-center justify-space-between">
        <router-link :to="{ name: 'home' }" class="nav__logo mr-3">
          <span
            class="text-h5"
            :class="[
              this.$route.path === '/' ? 'white--text' : 'primary--text',
            ]"
            >Rent</span
          >
          <span
            class="text-h5 font-weight-bold"
            :class="[
              this.$route.path === '/'
                ? 'white--text'
                : 'navigattionDrawer--text',
            ]"
            >Finder</span
          >
        </router-link>
        <!-- <div class="banner__humburger" @click="toggleNavbar">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div> -->
        <div class="nav__links flex-grow-1 d-flex align-center">
          <router-link
          class="ma-4"
            :class="[this.$route.path === '/' ? 'white--text' : 'third--text']"
            :to="{ name: '' }"
            >Search for a house</router-link
          >
          <router-link
          class="ml-auto ma-4"
            :class="[this.$route.path === '/' ? 'white--text' : 'third--text']"
            :to="{ name: 'login' }"
            >Log in</router-link
          >
          <router-link
          class="ma-4"
            :class="[this.$route.path === '/' ? 'white--text' : 'third--text']"
            :to="{ name: 'signup' }"
            >Sign up</router-link
          >
        </div>
      </v-container>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>
