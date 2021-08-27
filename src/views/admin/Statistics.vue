<template>
  <div class="statistics">
    <!-- Statistic numbers -->
    <v-row>
      <v-col cols="12" sm="4" v-for="item in houseNumbers" :key="item.title">
        <DashboardNumbers :data="item" />
      </v-col>
    </v-row>

    <!-- Charts -->
    <v-row>
      <v-col cols="12" lg="6">
        <apexchart
          width="500"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </v-col>
      <v-col cols="12" lg="6">
        <apexchart
          width="500"
          type="line"
          :options="options"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DashboardNumbers from "@/components/DashboardNumbers.vue";
// import VueApexCharts from 'vue-apexcharts'
export default {
  name: "Statistics",

  components: {
    DashboardNumbers,
    // VueApexCharts,
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

      // Graph data
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
};
</script>
