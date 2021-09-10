<template>
  <div class="settings">
    <div class="main-content">
      <HouseOwnerNavbar v-if="getUser.role === 'HouseOwner'" />
      <UserNavbar v-else-if="getUser.role === 'User'" />
      <v-container>
        <v-row>
          <!-- Navigations -->
          <v-col cols="12" md="4">
            <!-- title -->
            <h3 class="mb-15 text-h4">Settings</h3>
            <!-- nav sidebar link -->
            <div v-for="item in items" :key="item.title" class="mb-4">
              <router-link
                :to="{ name: item.routeName }"
                class="d-flex align-center pa-2"
              >
                <v-icon large class="mr-3">{{ item.icon }}</v-icon>
                <div>
                  <span class="d-block font-weight-bold">{{ item.title }}</span>
                  <span>{{ item.description }}</span>
                </div>
              </router-link>
            </div>
          </v-col>
          <!-- Navigation Content -->
          <v-col cols="12" md="7" class="offset-sm-0 offset-md-1">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import HouseOwnerNavbar from "@/components/houseOwner/Navbar.vue";
import UserNavbar from "@/components/Navbar.vue";
export default {
  name: "Settings",

  components: { HouseOwnerNavbar, UserNavbar },

  data() {
    return {
      items: [
        {
          icon: "badge",
          title: "Profile Settings",
          routeName: "editprofile",
          description: "Manage and Edit your profile information",
        },
        {
          icon: "admin_panel_settings",
          title: "Account Settings",
          routeName: "changepassword",
          description: "change your account password",
        },
      ],
    };
  },

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  },
};
</script>
