<template>
  <div class="global-stats py-10 text-center">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          v-for="(value, propertyName) in statistics"
          :key="propertyName"
          class="stat-col"
        >
          <h4 class="text-h4 font-weight-black">
            {{ formatStats(value) }}
          </h4>
          <p class="third--text">{{ propertyName }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "GlobalStatistics",

  props: {
    statistics: {
      type: Object,
      required: true,
    }
  },

  methods: {
    // Format the stats values
    formatStats(value) {
      return value >= 1000
        ? (value / 1000).toFixed(0).toString() + "k+"
        : value;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .stat-col {
    margin-bottom: 30px;
  }
}
</style>
