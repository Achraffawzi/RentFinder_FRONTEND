<template>
  <div class="search">
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
              v-model="price"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2" lg="4">
            <v-btn class="primary" dark @click="onSearch">Search</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Result section -->
      <div v-if="result.length > 0">
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
import Navbar from "@/components/Navbar.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
export default {
  name: "Search",
  components: {
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
      price: 1,
      searchedAnnouncementsObj: {
        city: this.city,
        price: this.price,
      },
      //#endregion

      //#region Other Data
      featuredAnnouncements: [],
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

  mounted() {
    this.getFeaturedAnnouncements();
  },

  methods: {
    async getFeaturedAnnouncements() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS);
        const response = await req.fetch();
        this.featuredAnnouncements = response.data.slice(0, 4);
      } catch (e) {
        console.log(e);
      }
    },

    onSearch() {
      if (this.$refs.formSearch.validate()) {
        this.result = this.searchedAnnouncements;
      }
    },
  },
};
</script>
