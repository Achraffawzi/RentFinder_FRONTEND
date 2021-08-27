<template>
  <div class="announcement-cards">
    <!-- Snackbar for added to favorite -->
    <v-snackbar v-model="snackbarFavorite" top color="primary">
      {{ snackbarFavoriteMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarFavorite = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
                v-if="$route.name !== 'favorite'"
                class="white--text"
                style="cursor: pointer"
                @click="onAddToOrRemoveFromFavorite(item.Id)"
                >{{ favoriteIcon }}</v-icon
              >
            </v-card-title>
          </v-img>
          <v-card-text>
            <!-- content -->
            <p class="font-weight-bold black--text">{{ item.Title }}</p>
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
export default {
  name: "CardAnnouncement",
  props: ["result"],
  data() {
    return {
      //#region Component Models
      snackbarFavorite: false,
      //#endregion

      //#region General Data
      isFaved: false,
      snackbarFavoriteMsg: "",
      //#endregion
    };
  },
  computed: {
    // Change the heart icon depending on the isFaved value
    favoriteIcon() {
      return this.isFaved ? "favorite" : "favorite_border";
    },
  },
  methods: {
    async onAddToOrRemoveFromFavorite(announcementID) {
      this.isFaved = !this.isFaved;
      // Impl add to fav and remove from fav api
      if (this.isFaved) {
        try {
          const req = createApiEndPoints(END_POINTS.CREATE_FAVORITE);
          const response = await req.create({ announcementId: announcementID });

          this.snackbarFavoriteMsg = response.data.message;
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const req = createApiEndPoints(END_POINTS.DELETE_FAVORITE);
          const response = await req.delete({ announcementId: announcementID });

          this.snackbarFavoriteMsg = response.data.message;
        } catch (e) {
          console.log(e);
        }
      }

      this.snackbarFavorite = true;
    },
  },
};
</script>
