<template>
  <div class="search">
    <Navbar />

    <v-container>
      <!-- The search fields -->
      <v-row class="align-center">
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            prepend-icon="location_on"
            label="city"
            :rules="cityRule"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-select
            :items="pricesRange"
            prepend-icon="attach_money"
            label="price range"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
      // Rules
      cityRule: [
        (value) => (/^[a-zA-Z]{2,}$/.test(value) && value.length > 0) || "City must be an alphabetic value",
      ],
      pricesRange: [
        "$0 - $10/night",
        "$10 - $20/night",
        "$20 - $30/night",
        "$30 - $40/night",
        "$40+/night",
      ],
    };
  },
};
</script>
