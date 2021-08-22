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
    <v-col cols="12" sm="6" md="4" v-for="item in result" :key="item.id">
      <v-card class="mx-auto" outlined :to="{ name: 'announcementdetails', params: { id: item.id }}">
        <v-img
          :src="item.photos[0]"
          height="200"
          class="align-end white--text"
        >
          <v-card-title class="justify-space-between">
            <h5 class="text-h5 font-weight-bold">${{ item.price }}/night</h5>
            <v-icon v-if="$route.name !== 'favorite'" class="white--text" style="cursor: pointer" @click="onAddToFavorite"
              >{{ favoriteIcon }}</v-icon
            >
          </v-card-title>
        </v-img>
        <v-card-text>
          <!-- content -->
          <p>{{ item.title }}</p>
          <v-rating
            background-color="yellow lighten-3"
            length="5"
            :value="item.rating"
            size="20"
            readonly
            color="yellow"
          ></v-rating>
        </v-card-text>
        <v-card-actions class="align-center justify-space-between">
          <div>
            <span class="font-weight-medium mr-4">{{ item.city }}</span>
            <span class="font-weight-medium">{{ item.publicationDate }}</span>
          </div>
          <v-btn v-if="$route.name === 'favorite'" class="error dark">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
export default {
  name: "CardAnnouncement",
  props: ["result"],
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
