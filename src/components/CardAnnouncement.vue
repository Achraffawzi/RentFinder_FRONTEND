<template>
  <div class="announcement-cards">
    <!-- Snackbar for added to favorite -->
    <v-snackbar
      v-model="snackbarFavorite"
      top
      color="primary"
    >
      Announcement added to favorite!

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
    <v-col cols="12" sm="6" md="4">
      <v-card class="mx-auto" outlined>
        <v-img
          src="https://source.unsplash.com/random"
          height="200"
          class="align-end white--text"
        >
          <v-card-title class="justify-space-between">
            <h5 class="text-h5 font-weight-bold">$55/night</h5>
            <v-icon class="white--text" style="cursor: pointer" @click="onAddToFavorite"
              >{{ favoriteIcon }}</v-icon
            >
          </v-card-title>
        </v-img>
        <v-card-text>
          <!-- content -->
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <v-rating
            background-color="yellow lighten-3"
            length="5"
            value="4"
            size="20"
            readonly
            color="yellow"
          ></v-rating>
        </v-card-text>
        <v-card-actions>
          <span class="font-weight-medium mr-4">Agadir</span>
          <span class="font-weight-medium">23/05/2000</span>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-card class="mx-auto" outlined>
        <v-img
          src="https://source.unsplash.com/random"
          height="200"
          class="align-end white--text"
        >
          <v-card-title class="justify-space-between">
            <h5 class="text-h5 font-weight-bold">$55/night</h5>
            <v-icon class="white--text" style="cursor: pointer" @click="onAddToFavorite"
              >{{ favoriteIcon }}</v-icon
            >
          </v-card-title>
        </v-img>
        <v-card-text>
          <!-- content -->
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <v-rating
            background-color="yellow lighten-3"
            length="5"
            value="4"
            size="20"
            readonly
            color="yellow"
          ></v-rating>
        </v-card-text>
        <v-card-actions>
          <span class="font-weight-medium mr-4">Agadir</span>
          <span class="font-weight-medium">23/05/2000</span>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-card class="mx-auto" outlined>
        <v-img
          src="https://source.unsplash.com/random"
          height="200"
          class="align-end white--text"
        >
          <v-card-title class="justify-space-between">
            <h5 class="text-h5 font-weight-bold">$55/night</h5>
            <v-icon class="white--text" style="cursor: pointer" @click="onAddToFavorite"
              >{{ favoriteIcon }}</v-icon
            >
          </v-card-title>
        </v-img>
        <v-card-text>
          <!-- content -->
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <v-rating
            background-color="yellow lighten-3"
            length="5"
            value="4"
            size="20"
            readonly
            color="yellow"
          ></v-rating>
        </v-card-text>
        <v-card-actions>
          <span class="font-weight-medium mr-4">Agadir</span>
          <span class="font-weight-medium">23/05/2000</span>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
export default {
  name: "CardAnnouncement",
  props: ["housesResult"],
  data() {
    return {
      snackbarFavorite: false,
      isFaved: false,
    }
  },
  computed: {
    // Change the heart icon depending on the isFaved value
    favoriteIcon() {
      return this.isFaved ? 'favorite' : 'favorite_border';
    }
  },
  methods: {
    onAddToFavorite() {
      this.snackbarFavorite = true;
    }
  }
};
</script>

<style lang="scss" scoped>
// .grid-container {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//   row-gap: 20px;
// }

// @media screen and (max-width: 600px) {
//   .grid-container {
//     grid-template-columns: 1fr;
//   }
// }
</style>
