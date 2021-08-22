<template>
  <div class="dashboard">
    <v-container>
      <!-- Logout btn -->
      <v-row>
        <v-col cols="12" sm="2" offset-sm="10">
          <v-btn text depressed>
            <v-icon>logout</v-icon>
            <span>Log out</span>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Statistic numbers -->
      <v-row>
          <v-col cols="12" sm="4" v-for="item in houseNumbers" :key="item.title">
              <DashboardNumbers  :data="item" />
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DashboardNumbers from "@/components/DashboardNumbers.vue";
export default {
  name: "HouseOwnerDashboard",
  components: {
    DashboardNumbers,
  },
  data() {
    return {
      houseNumbers: [
        {
          title: "Available Houses",
          icon: "event_available",
          value: 2,
        },
        {
          title: "Rented Houses",
          icon: "event_busy",
          value: 14,
        },
        {
          title: "Total Houses",
          icon: "functions",
          value: 16,
        },
      ],
    };
  },
};
</script>
