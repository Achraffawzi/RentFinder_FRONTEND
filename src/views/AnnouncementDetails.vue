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
              :src="announcement.announcement.Photos"
            >
            </v-img>
          </carousel>
          <div class="d-flex align-center justify-space-between mt-4">
            <div>
              <span class="primary--text text-h5 font-weight-medium"
                >${{ announcement.announcement.Price }}</span
              >
              <span class="primary--text">/night</span>
            </div>
            <h5 class="text-h5">{{ announcement.announcement.Location }}</h5>
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
          <h2 class="font-weight-bold my-2">{{ announcement.announcement.Title }}</h2>
          <p class="mt-4 mb-13">{{ announcement.announcement.Description }}</p>
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
          <p class="mt-6 font-weight-medium">
            Published in {{ announcement.announcement.PublicationDate }}
          </p>
        </v-col>

        <!-- The column for the house owner info -->
        <v-col cols="12" md="4" order-sm="first" order-md="last">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-img
                    class="rounded-pill"
                    :src="announcement.houseOwner.Avatar === 'default-profile-image.jpg' ? 'http://localhost:4000/static/images/user/default-profile-image.jpg' : announcement.houseOwner.Avatar"
                    max-width="100"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="8">
                  <h5 class="text-h5 font-weight-medium" style="white-space: nowrap;">{{ announcement.houseOwner.FirstName + " " + announcement.houseOwner.LastName }}</h5>
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
                    There might be a lot of scammers posting fake announcements, and the RentFinder community has no responsibilities for the scam!

                    <!-- Phone Number -->
                    <div
                      class="text-center primary--text font-weight-bold mt-5"
                      style="font-size: 20px"
                    >
                      {{ announcement.houseOwner.PhoneNumber }}
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

  mounted() {
    this.getAnnouncement(this.id);
  },

  methods: {
    async getAnnouncement(announcementId) {
      try {
        const req = createApiEndPoints(
          END_POINTS.GET_ANNOUNCEMENT_BY_ID + "" + announcementId
        );
        const response = await req.fetch();
        this.announcement = response.data;
        await this.fillRoomsNumbers();
      } catch (e) {
        console.log("catch block");
        console.log(e);
      }
    },

    fillRoomsNumbers() {
      this.totalRooms = [
        {
          icon: "roofing",
          title: "total floors",
          value: this.announcement.announcement.TotalFloors,
        },
        {
          icon: "bathtub",
          title: "total bathrooms",
          value: this.announcement.announcement.TotalBathrooms,
        },
        {
          icon: "dinner_dining",
          title: "total livingrooms",
          value: this.announcement.announcement.TotalLivingrooms,
        },
        {
          icon: "restaurant",
          title: "total kitchens",
          value: this.announcement.announcement.TotalKitchens,
        },
        {
          icon: "king_bed",
          title: "total bedrooms",
          value: this.announcement.announcement.TotalBedrooms,
        },
        {
          icon: "aspect_ratio",
          title: "surface (m²)",
          value: this.announcement.announcement.Surface,
        },
      ];
    },
  },
};
</script>
