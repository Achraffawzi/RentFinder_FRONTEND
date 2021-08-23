<template>
  <div class="search">
    <Navbar />

    <v-container>
      <v-form ref="formSearch">
        <!-- The search fields -->
        <v-row class="align-center">
          <v-col cols="12" sm="5" lg="3">
            <v-text-field
              prepend-icon="location_on"
              label="city"
              :rules="cityRule"
              v-model="searchedAnnouncementsObj.city"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-select
              :items="pricesRange"
              prepend-icon="attach_money"
              label="price range"
              :rules="priceRangeRule"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="1" lg="1">
            <v-btn class="primary" dark @click="onSearch">Search</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Result section -->
      <div v-if="result.length > 0">
        <p class="third--text font-weight-medium mb-4">Number of result found : {{ result.length }}</p>
      <CardAnnouncement :result="result" />
      </div>
      
      <!-- Footer -->
      <Footer />
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Search",
  components: {
    Navbar,
    CardAnnouncement,
    Footer,
  },
  data() {
    return {
      //#region Input Rules
      cityRule: [
        (value) =>
          (/^[a-zA-Z]{2,}$/.test(value) && value.length > 0) ||
          "City must be an alphabetic value",
      ],
      priceRangeRule: [(value) => !!value || "Please select a range"],
      //#endregion

      //#region Inputs Data Binding
      city: "",
      price: 1,
      searchedAnnouncementsObj: {
        city: this.city,
        price: this.price,
      },
      //#endregion
      
      //#region Other Data
      result: [],
      pricesRange: [
        "$0 - $10/night",
        "$10 - $20/night",
        "$20 - $30/night",
        "$30 - $40/night",
        "$40+/night",
      ],
      //#endregion
    };
  },

  computed: {
    searchedAnnouncements() {
      return this.$store.getters.searchedAnnouncements({
        ...this.searchedAnnouncementsObj,
      });
    },
  },

  methods: {
    onSearch() {
      if (this.$refs.formSearch.validate()) {
        this.result = this.searchedAnnouncements;
      }
    },
  },
};
</script>
