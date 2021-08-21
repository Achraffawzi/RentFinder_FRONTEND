<template>
  <div class="announcement-details">
    <Navbar />
    <v-container>
      <v-row>
        <!-- The column for the left showcase => announcement info -->
        <v-col cols="12" md="7">
          <carousel
            :nav="false"
            :responsive="{
              0: { items: 1, nav: false },
              600: { items: 1, nav: false },
            }"
            :center="true"
          >
            <v-img
              v-for="photo in getAnnouncement.photos"
              :key="photo"
              :src="photo"
            >
            </v-img>
          </carousel>
          <div class="d-flex align-center justify-space-between mt-4">
            <div>
              <span class="primary--text text-h5 font-weight-medium">${{ getAnnouncement.price }}</span>
              <span class="primary--text">/night</span>
            </div>
            <h5 class="text-h5">{{ getAnnouncement.city }}</h5>
          </div>
          <v-rating
            size="25"
            background-color="yellow lighten-3"
            length="5"
            color="yellow"
            class="mb-5"
            :value="getAnnouncement.rating"
            readonly
          ></v-rating>
          <h2 class="font-weight-bold my-2">{{ getAnnouncement.title }}</h2>
          <p class=" mt-4 mb-13">{{ getAnnouncement.description }}</p>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              v-for="count in totalRooms"
              :key="count.title"
            >
            <div class="d-flex flex-column align-center justify-center">
              <div>
                <v-icon class="third--text">{{ count.icon }}</v-icon>
              </div>
              <div class="third--text"> {{ count.value }}</div>
              <div class="third--text"> {{ count.title }}</div>
            </div>
              <!-- <p class="third--text my-0">{{ count.title }} : {{ count.value }}</p> -->
            </v-col>
          </v-row>
          <p class="mt-6 font-weight-medium">Published in {{ getAnnouncement.publicationDate }}</p>
        </v-col>

        <!-- The column for the house owner info -->
        <v-col cols="12" md="4">test</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import carousel from "vue-owl-carousel";
export default {
  name: "AnnouncementDetails",
  components: {
    Navbar,
    carousel,
  },
  props: ["id"],
  data() {
    return {
      totalRooms: null,
    };
  },
  computed: {
    getAnnouncement() {
      return this.$store.getters.getAnnouncement(this.id);
    },
  },

  created() {
    this.totalRooms = [
      { icon: "roofing", title: "total floors", value: this.getAnnouncement.totalfloors },
      { icon: "bathtub", title: "total bathrooms", value: this.getAnnouncement.totalbathrooms },
      {
        icon: "dinner_dining", title: "total livingrooms",
        value: this.getAnnouncement.totallivingrooms,
      },
      { icon: "restaurant", title: "total kitchens", value: this.getAnnouncement.totalkitchens },
      { icon: "king_bed", title: "total bedrooms", value: this.getAnnouncement.totalbedrooms },
      { icon: "aspect_ratio", title: "surface", value: this.getAnnouncement.surface },
    ];
  },
};
</script>
