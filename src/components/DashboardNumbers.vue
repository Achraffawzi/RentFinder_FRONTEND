<template>
  <div class="dashboard-numbers">
    <v-card class="elevation-5">
      <v-card-title class="d-flex align-center justify-space-between">
        <h4 class="text-h4 primary--text font-weight-black">
          {{ data.value }}
        </h4>
        <v-icon class="primary--text" x-large>{{ data.icon }}</v-icon>
      </v-card-title>
      <v-card-text>
        <span>{{ data.title }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DashboardNumbers",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
