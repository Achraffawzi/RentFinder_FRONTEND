<template>
  <div class="house-owner-navbar py-3">
    <!-- Logout btn -->
    <div class="d-flex align-center justify-start flex-wrap">
      <v-btn @click="onSignout" text depressed class="ma-2">
        <v-icon class="mr-2">logout</v-icon>
        <span>Signout</span>
      </v-btn>
      <v-btn text depressed>
        <router-link
        :to="{ name: 'houseownereditprofile' }"
      >
        <v-icon class="mr-2">person</v-icon>
        <span>Profile</span>
      </router-link>
      </v-btn>
      <v-btn text depressed>
        <router-link
        :to="{ name: 'houseownerdashboard' }"
      >
        <v-icon class="mr-2">dashboard</v-icon>
        <span>dashboard</span>
      </router-link>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
