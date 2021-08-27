<template>
  <div class="statistics">
      <!-- Statistic numbers -->
      <v-row>
        <v-col cols="12" sm="4" v-for="item in houseNumbers" :key="item.title">
          <DashboardNumbers :data="item" />
        </v-col>
      </v-row>
  </div>
</template>

<script>
import DashboardNumbers from "@/components/DashboardNumbers.vue";
export default {
  name: "Statistics",

  components: {
    DashboardNumbers,
  },

  data() {
    return {
      houseNumbers: [
        {
          title: "Available Houses",
          icon: "event_available",
          value: 10,
        },
        {
          title: "Rented Houses",
          icon: "event_busy",
          value: 3,
        },
        {
          title: "Total Houses",
          icon: "functions",
          value: 13,
        },
      ],
    };
  },
};
</script>
