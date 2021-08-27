<template>
  <div class="admin-dashboard">
    <!-- Navbar Header -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="grey--text"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- Navigatin Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      class="navigationDrawer elevation-19"
    >
      <div
        class="branding white--text font-weight-bold text-center pa-5"
        style="font-size: 22px"
      >
        RentFinder
      </div>
      <v-list-item class="custom-list-item">
        <v-list-item-avatar
          max-width="100"
          height="100"
          width="100"
          class="mx-auto"
        >
          <v-img
            src="https://www.realmadrid.com/img/vertical_380px/ramos_ficha_550x650_20210630115027.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="white--text text-center">
          <v-list-item-title class="font-weight-bold"
            >Sergio Ramos</v-list-item-title
          >
          <p class="caption">Admin</p>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav shaped>
        <v-list-item-group v-model="drawer">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="{ name: item.routeName }"
          >
            <v-list-item-icon>
              <v-icon small class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text subtitle-2">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Main Content ( dashoard, users, houseowners, settings ) -->
    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",

  data() {
    return {
      drawer: false,
      items: [
        { title: "Statistics", icon: "equalizer", routeName: "statistics" },
        { title: "House Owners", icon: "record_voice_over", routeName: "houseowners" },
        { title: "Users", icon: "groups", routeName: "users" },
        { title: "Announcements", icon: "description", routeName: "announcements" },
        { title: "Settings", icon: "settings", routeName: "settings" },
        { title: "Logout", icon: "logout", routeName: "" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-list-item {
  flex-direction: column !important;
  min-height: 0 !important;
  flex: none;
}

.v-item--active,
.v-list-item--active {
  background-color: $primary-color;
  color: #fff;
}

.v-list--nav {
  padding-left: 0;
}
</style>
