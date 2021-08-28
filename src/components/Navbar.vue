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
            v-for="link in links"
            :key="link.title"
            class="ma-4 hidden-sm-and-down"
            :class="[
              $route.path === '/' ? 'white--text' : 'third--text',
              link.title === 'Log in' ? 'ml-sm-0 ml-sm-auto ma-4' : '',
              link.title === 'Sign up' ? 'py-1 px-5' : '',
            ]"
            :style="{
              background:
                link.title === 'Sign up' ? 'rgba(255, 255, 255, 0.3)' : '',
            }"
            :to="{ name: link.routeName }"
            >{{ link.title }}</router-link
          >
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
        <v-list-item-group v-model="drawer">
          <v-list-item
            v-for="link in links"
            :key="link.title"
            link
            :to="{ name: link.routeName }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
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

      links: [
        { title: "Search for a house", routeName: "search" },
        { title: "Log in", routeName: "login" },
        { title: "Sign up", routeName: "signup" },
        { title: "Favorite", routeName: "favorite" },
        { title: "Profile", routeName: "usereditprofile" },
        { title: "Log out", routeName: "logout" },
      ],
    };
  },
};
</script>
