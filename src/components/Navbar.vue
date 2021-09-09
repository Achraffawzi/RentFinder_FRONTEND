<template>
  <nav class="mb-5 navbar">
    <v-app-bar style="background-color: transparent" elevate-on-scroll>
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logo link -->
        <router-link :to="{ name: 'home' }" class="navbar__logo mr-3">
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

        <!-- Links -->
        <div class="flex-grow-1 d-flex align-center">
          <router-link
            v-for="link in navbarItems"
            :key="link.title"
            class="ma-4 hidden-sm-and-down"
            :class="[
              $route.path === '/' ? 'white--text' : 'third--text',
              link.title === 'Log in' || link.title === 'Favorite' ? 'ml-sm-0 ml-sm-auto ma-4' : '',
              link.title === 'Sign up' ? 'py-1 px-5' : '',
            ]"
            :style="{
              background:
                link.title === 'Sign up' ? 'rgba(255, 255, 255, 0.3)' : '',
            }"
            :to="{ name: link.routeName }"
            >{{ link.title }}</router-link
          >
          <span v-if="getUser" class="white--text hidden-sm-and-down ma-4" @click="onSignout" style="cursor: pointer;">Signout</span>
        </div>

        <!-- App Bars -->
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          :class="[$route.path === '/' ? 'white--text' : 'third--text']"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <!-- Navigation drawer ====> Responsive navbar -->
    <v-navigation-drawer
      v-model="drawer"
      class="white--text elevation-10"
      app
      temporary
    >
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="link in navbarItems"
            :key="link.title"
            link
            :to="{ name: link.routeName }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <span @click="onSignout" style="cursor: pointer;" v-if="getUser">Signout</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      //#region Component Models
      drawer: false,
      //#endregion
    };
  },

  computed: {
    getUser() {
      return localStorage.getItem('L_T') !== null ? true : false;
    },

    navbarItems() {
      let links = [
        { title: "Search for a house", routeName: "search" },
        { title: "Favorite", routeName: "favorite" },
        { title: "Profile", routeName: "usereditprofile" },
      ];

      if(this.getUser == null || this.getUser == undefined || localStorage.getItem('L_T') == null || localStorage.getItem('L_T') == undefined) {
        links = [
          { title: "Search for a house", routeName: "search" },
          { title: "Log in", routeName: "login" },
          { title: "Sign up", routeName: "signup" },
        ]
      }

      return links;
    },
  },

  methods: {
    onSignout() {
      console.log("sign out");
      this.$store.dispatch('setUser', null);
      localStorage.removeItem('L_T');
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
