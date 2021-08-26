<template>
  <div class="announcement-details">
    <Navbar />
    <v-container>
      <v-row>
        <!-- The column for the left showcase => announcement info -->
        <v-col cols="12" md="8" order-md="first">
          <carousel
            :nav="false"
            :responsive="{
              0: { items: 1, nav: false },
              600: { items: 1, nav: false },
            }"
            :center="true"
          >
            <v-img
              :src="announcement.Photos.split(' ')[0]"
            >
            </v-img>
          </carousel>
          <div class="d-flex align-center justify-space-between mt-4">
            <div>
              <span class="primary--text text-h5 font-weight-medium"
                >${{ announcement.Price }}</span
              >
              <span class="primary--text">/night</span>
            </div>
            <h5 class="text-h5">{{ announcement.Location }}</h5>
          </div>
          <v-rating
            size="25"
            background-color="yellow lighten-3"
            length="5"
            color="yellow"
            class="mb-5"
            :value="4"
            readonly
          ></v-rating>
          <h2 class="font-weight-bold my-2">{{ announcement.Title }}</h2>
          <p class="mt-4 mb-13">{{ announcement.Description }}</p>
          <!-- Rooms numbers -->
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
                <div class="third--text">{{ count.value }}</div>
                <div class="third--text">{{ count.title }}</div>
              </div>
            </v-col>
          </v-row>
          <!-- <p class="mt-6 font-weight-medium">
            Published in {{ getAnnouncement.publicationDate }}
          </p> -->
        </v-col>

        <!-- The column for the house owner info -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
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
      dialogPhoneNumber: false,
      announcement: null,
    };
  },
  // computed: {
  //   getAnnouncement() {
  //     return this.$store.getters.getAnnouncement(this.id);
  //   },
  // },

  mounted() {
    this.getAnnouncement(this.id);
    // this.fillRoomsNumbers();
  },

  methods: {
    async getAnnouncement(announcementId) {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENT_BY_ID + "" + announcementId);
        const response = await req.fetch();
        this.announcement = response.data;
        await this.fillRoomsNumbers();
      } catch(e) {
        console.log("catch block");
        console.log(e);
      }
    },

    fillRoomsNumbers() {
      this.totalRooms = [
      {
        icon: "roofing",
        title: "total floors",
        value: this.announcement.TotalFloors,
      },
      {
        icon: "bathtub",
        title: "total bathrooms",
        value: this.announcement.TotalBathrooms,
      },
      {
        icon: "dinner_dining",
        title: "total livingrooms",
        value: this.announcement.TotalLivingrooms,
      },
      {
        icon: "restaurant",
        title: "total kitchens",
        value: this.announcement.TotalKitchens,
      },
      {
        icon: "king_bed",
        title: "total bedrooms",
        value: this.announcement.TotalBedrooms,
      },
      {
        icon: "aspect_ratio",
        title: "surface",
        value: this.announcement.Surface,
      },
    ];
    }
  },
};
</script>
