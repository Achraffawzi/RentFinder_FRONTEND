<template>
  <div class="search">
    <!-- Snackbar for fields error -->
    <BaseSnackbar v-if="show" :show="show" :message="snackbarMsg" :color="snackbarColor" v-on:closeSnackbar="show = false" />
    <Navbar />

    <v-container>
      <v-form ref="formSearch">
        <!-- The search fields -->
        <v-row class="align-center">
          <v-col cols="12" sm="5" lg="4">
            <v-text-field
              prepend-icon="location_on"
              label="city"
              :rules="cityRule"
              v-model="city"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5" lg="4">
            <v-select
              :items="pricesRange"
              prepend-icon="attach_money"
              label="price range"
              :rules="priceRangeRule"
              v-model="priceRange"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2" lg="4">
            <v-btn class="primary" dark @click="onSearch">Search</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Result section -->
      <div v-if="result">
        <p class="third--text font-weight-medium mb-4">
          Number of result found : {{ result.length }}
        </p>
        <CardAnnouncement :result="result" />
      </div>
      <div v-else>
        <p class="third--text font-weight-medium mb-4 text-h5">
          Featured Announcements
        </p>
        <CardAnnouncement :result="featuredAnnouncements" />
      </div>
    </v-container>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
import BaseSnackbar from "@/components/BaseSnackbar.vue";
import Navbar from "@/components/Navbar.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
export default {
  name: "Search",
  components: {
    BaseSnackbar,
    Navbar,
    CardAnnouncement,
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
      priceRange: "",
      searchedAnnouncementsObj: {
        city: this.city,
        price: this.price,
      },
      snackbarMsg: "",
      snackbarColor: "",
      show: false,
      //#endregion

      //#region Other Data
      announcements: [],
      featuredAnnouncements: [],
      result: null,
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

  mounted() {
    this.getAnnouncements();
  },

  methods: {
    async getAnnouncements() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS);
        const response = await req.fetch();
        this.announcements = response.data;
        this.featuredAnnouncements = response.data.slice(0, 4);
      } catch (e) {
        this.snackbarMsg = "Something went wrong!";
        this.snackbarColor = "error";
      }
    },

    getPriceFromRange(range) {
      // check wheather the range had two values or just one ($40+/night)
      if(range.includes('+')) {
        let price = range.split('/')[0].split('$')[1].split('+')[0];

        return price;
      }
      else {
        let priceInf = range.split('/')[0].split(' - ')[0].split('$')[1];
        let priceSup = range.split('/')[0].split(' - ')[1].split('$')[1];

        return [priceInf, priceSup];
      }
    },

    onSearch() {
      if (this.$refs.formSearch.validate()) {
        // Get the price interval
        let priceRange = this.getPriceFromRange(this.priceRange);
        if(Array.isArray(priceRange)) {
          this.result = this.announcements.filter(ann => ann.Location.toLowerCase().includes(this.city.toLowerCase()) && (ann.Price >= parseInt(priceRange[0]) && ann.Price <= parseInt(priceRange[1])))
        } else {
          this.result = this.announcements.filter(ann => ann.Location.toLowerCase().includes(this.city.toLowerCase()) && ann.Price >= parseInt(priceRange))
        }
      } else {
        this.show = true;
        this.snackbarMsg = "Double check your fields' values";
        this.snackbarColor = "error";
      }
    },
  },
};
</script>
