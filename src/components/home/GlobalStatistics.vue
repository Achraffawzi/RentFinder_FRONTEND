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
          <v-card class="elevation-3 pa-3">
            <v-card-title class="d-flex align-center justify-space-between flex-wrap">
              <p class="text-h5 primary--text font-weight-black" style="white-space:nowrap">{{ propertyName }}</p>
              <v-icon class="primary--text" v-if="propertyName === 'HouseOwners'" large>assignment_ind</v-icon>
              <v-icon class="primary--text" v-else-if="propertyName === 'Users'" large>person</v-icon>
              <v-icon class="primary--text" v-else-if="propertyName === 'announcements'" large>description</v-icon>
            </v-card-title>

            <h4 class="text-h4 third--text font-weight-black text-left">
              {{ formatStats(value) }}
            </h4>
          </v-card>
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
    },
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
