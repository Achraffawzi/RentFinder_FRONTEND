<template>
  <div class="alert">
    <v-alert
      v-model="alert"
      :color="alertData.alertColor"
      border="left"
      elevation="2"
      colored-border
      :icon="alertData.alertIcon"
    >
      {{ alertData.alertMessage }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "BaseAlert",
  props: {
    alertData: {
      alertMessage: {
        type: String,
        required: true,
      },
      alertColor: {
        type: String,
        required: true,
      },
      alertIcon: {
        type: String,
        required: true,
      },
    },
  },
  data() {
    return {
      alert: true,
    };
  },
};
</script>
