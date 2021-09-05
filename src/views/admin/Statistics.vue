<template>
  <div class="statistics">
    <!-- Statistic numbers -->
    <!-- <v-row> -->
      <!-- <v-col cols="12" sm="4" v-for="item in houseNumbers" :key="item.title">
        <DashboardNumbers :data="item" />
      </v-col> -->
      <GlobalStatistics class="pt-0" v-if="statistics" :statistics="statistics"/>
    <!-- </v-row> -->

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
import { createApiEndPoints, END_POINTS } from "../../../api.js";
import GlobalStatistics from "@/components/home/GlobalStatistics.vue";
// import DashboardNumbers from "@/components/DashboardNumbers.vue";
// import VueApexCharts from 'vue-apexcharts'
export default {
  name: "Statistics",

  components: {
    // DashboardNumbers,
    // VueApexCharts,
    GlobalStatistics
  },

  data() {
    return {
      statistics: null,

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

  mounted() {
    this.getAnalytics();
  },

  methods: {
    async getAnalytics() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANALYTICS);
        const response = await req.fetch();
        this.statistics = response.data;
        console.log(response.data);
        console.log("from 200");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
