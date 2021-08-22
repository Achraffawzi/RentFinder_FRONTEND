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
              v-for="photo in getAnnouncement.photos"
              :key="photo"
              :src="photo"
            >
            </v-img>
          </carousel>
          <div class="d-flex align-center justify-space-between mt-4">
            <div>
              <span class="primary--text text-h5 font-weight-medium"
                >${{ getAnnouncement.price }}</span
              >
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
          <p class="mt-4 mb-13">{{ getAnnouncement.description }}</p>
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
              <!-- <p class="third--text my-0">{{ count.title }} : {{ count.value }}</p> -->
            </v-col>
          </v-row>
          <p class="mt-6 font-weight-medium">
            Published in {{ getAnnouncement.publicationDate }}
          </p>
        </v-col>

        <!-- The column for the house owner info -->
        <v-col cols="12" md="4" order-sm="first" order-md="last">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-img
                    src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2FBeautiful-luxury-home-exterior-at-twilight%2F960x0.jpg%3Ffit%3Dscale"
                    max-width="100"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="8">
                  <h5 class="text-h5 font-weight-medium">House Owner Name</h5>
                  <span class="font-weight-regular" style="font-size: 15px"
                    >House Owner city</span
                  >
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-actions>
              <v-dialog v-model="dialogPhoneNumber" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text depressed class="primary" v-bind="attrs" v-on="on"
                    >View Phone Number</v-btn
                  >
                </template>

                <v-card>
                  <v-card-title class="text-h5 error--text">
                    Be Careful
                  </v-card-title>

                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.

                    <!-- Phone Number -->
                    <div
                      class="text-center primary--text font-weight-bold mt-5"
                      style="font-size: 20px"
                    >
                      01111111111111
                    </div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="dialogPhoneNumber = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <Footer />
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import carousel from "vue-owl-carousel";
import Footer from "@/components/Footer.vue";
export default {
  name: "AnnouncementDetails",
  components: {
    Navbar,
    carousel,
    Footer,
  },
  props: ["id"],
  data() {
    return {
      totalRooms: null,
      dialogPhoneNumber: false,
    };
  },
  computed: {
    getAnnouncement() {
      return this.$store.getters.getAnnouncement(this.id);
    },
  },

  created() {
    this.totalRooms = [
      {
        icon: "roofing",
        title: "total floors",
        value: this.getAnnouncement.totalfloors,
      },
      {
        icon: "bathtub",
        title: "total bathrooms",
        value: this.getAnnouncement.totalbathrooms,
      },
      {
        icon: "dinner_dining",
        title: "total livingrooms",
        value: this.getAnnouncement.totallivingrooms,
      },
      {
        icon: "restaurant",
        title: "total kitchens",
        value: this.getAnnouncement.totalkitchens,
      },
      {
        icon: "king_bed",
        title: "total bedrooms",
        value: this.getAnnouncement.totalbedrooms,
      },
      {
        icon: "aspect_ratio",
        title: "surface",
        value: this.getAnnouncement.surface,
      },
    ];
  },
};
</script>
