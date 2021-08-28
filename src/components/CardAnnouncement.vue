<template>
  <div class="announcement-cards">
    <!-- Snackbar for added to favorite -->
    <BaseSnackbar
      v-if="show"
      :show="show"
      :message="snackbarMsg"
      :color="snackbarColor"
      v-on:closeSnackbar="show = false"
    />
    <!-- The cards -->
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="item in result" :key="item.Id">
        <!-- :to="{ name: 'announcementdetails', params: { id: item.Id }}" -->
        <v-card class="mx-auto" outlined>
          <v-img
            :src="item.Photos.split(' ')[0]"
            height="200"
            class="align-end white--text"
          >
            <v-card-title class="justify-space-between">
              <h5 class="text-h5 font-weight-bold">${{ item.Price }}/night</h5>
              <v-icon
                v-if="$route.name !== 'favorite' && getUser"
                class="white--text"
                style="cursor: pointer"
                @click="onAddToOrRemoveFromFavorite(item.Id)"
                >{{ favoriteIcon }}</v-icon
              >
              <v-icon
                class="white--text"
                style="cursor: pointer"
                v-else-if="$route.name === 'favorite'"
              >
                favorite
              </v-icon>
            </v-card-title>
          </v-img>
          <v-card-text>
            <!-- content -->
            <p class="font-weight-bold black--text">
              {{ item.Title }}
            </p>
            <v-rating
              background-color="yellow lighten-3"
              length="5"
              :value="4"
              size="20"
              readonly
              color="yellow"
            ></v-rating>
          </v-card-text>
          <v-card-actions class="align-center justify-space-between">
            <div>
              <span
                class="font-weight-medium grey--text text--lighten-1 mr-4"
                >{{ item.Location }}</span
              >
              <!-- <span class="font-weight-medium">{{ item.publicationDate }}</span> -->
            </div>
            <v-btn v-if="$route.name === 'favorite'" class="error dark"
              >Delete</v-btn
            >
            <v-btn class="primary">
              <router-link
                :to="{ path: 'announcementdetails/' + item.Id }"
                v-if="$route.name !== 'favorite'"
                class="white--text text-lowercase"
                >View Details</router-link
              >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
import BaseSnackbar from "@/components/BaseSnackbar.vue";
export default {
  name: "CardAnnouncement",
  components: { BaseSnackbar },
  props: ["result"],
  data() {
    return {
      //#region Component Models
      snackbarFavorite: false,
      //#endregion

      //#region Component Bindings
      show: false,
      snackbarMsg: "",
      snackbarColor: "",
      //#endregion

      //#region General Data
      isFaved: false,
      user: null,
      snackbarFavoriteMsg: "",
      //#endregion
    };
  },
  computed: {
    // Change the heart icon depending on the isFaved value
    favoriteIcon() {
      return this.isFaved ? "favorite" : "favorite_border";
    },

    // Get the user obj from store
    getUser() {
      return this.$store.getters.getUser;
    },
  },

  mounted() {},

  methods: {
    async onAddToOrRemoveFromFavorite(announcementID) {
      this.isFaved = !this.isFaved;
      // Impl add to fav api
      if (this.isFaved) {
        try {
          const req = createApiEndPoints(END_POINTS.CREATE_FAVORITE);
          const response = await req.create({ announcementId: announcementID });

          this.show = true;
          this.snackbarMsg = response.data.message;
          this.snackbarColor = "success";
        } catch (e) {
          this.isFaved = !this.isFaved;
          this.show = true;
          this.snackbarMsg = "something went wrong!";
          this.snackbarColor = "error";
        }
      }
      // remove from fav api
      else {
        try {
          const req = createApiEndPoints(END_POINTS.DELETE_FAVORITE);
          const response = await req.delete({
            announcementId: parseInt(announcementID),
          });
          this.snackbarFavoriteMsg = response.data.message;
          this.show = true;
          this.snackbarMsg = response.data.message;
          this.snackbarColor = "success";
        } catch (e) {
          this.isFaved = !this.isFaved;
          this.show = true;
          this.snackbarMsg = "something went wrong!";
          this.snackbarColor = "error";
        }
      }

      // this.snackbarFavorite = true;
    },
  },
};
</script>
