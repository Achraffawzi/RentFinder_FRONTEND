<template>
  <div class="house-owner-navbar py-3">
    <div class="d-flex align-center justify-start flex-wrap">
      <v-btn
        text
        depressed
        v-for="link in links"
        :key="link.title"
        class="hidden-sm-and-down"
      >
        <router-link :to="{ name: link.routeName }">
          <v-icon class="mr-2">{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
        </router-link>
      </v-btn>
      <v-btn @click="onSignout" text depressed class="ma-2 hidden-sm-and-down">
        <v-icon class="mr-2">logout</v-icon>
        <span>Signout</span>
      </v-btn>
    </div>

    <!-- Navigation drawer for small devices -->
    <!-- Navigation drawer ====> Responsive navbar -->
    <!-- App Bars -->
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      :class="[$route.path === '/' ? 'white--text' : 'third--text']"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      class="white--text elevation-10 hidden-md-and-up"
      app
      temporary
    >
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="link in links"
            :key="link.title"
            link
            :to="{ name: link.routeName }"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>{{ link.icon }}</v-icon>
                <span>{{ link.title }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <div @click="onSignout">
              <v-icon>logout</v-icon>
              <span>Signout</span>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      drawer: false,

      links: [
        {
          title: "Profile",
          icon: "person",
          routeName: "houseownereditprofile",
        },
        {
          title: "Dashboard",
          icon: "dashboard",
          routeName: "houseownerdashboard",
        },
      ],
    };
  },

  methods: {
    onSignout() {
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("L_T");
      this.$router.push({ name: "home" });
    },
  },
};
</script>
