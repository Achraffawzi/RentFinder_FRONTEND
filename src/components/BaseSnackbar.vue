<template>
  <div class="base-snackbar">
    <v-snackbar timeout="-1" v-model="show" top :color="color">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          class="white--text"
          text
          v-bind="attrs"
          @click="$emit('closeSnackbar')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "BaseSnackbar",

  props: {
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },

  //   data() {
  //     return {
  //       snackbar: this.show,
  //     };
  //   },
};
</script>
