<template>
  <div class="card-announcement">
    <v-container>
      <div class="d-flex">
        <img src="https://source.unsplash.com/random/60x60" alt="" />
        <v-card outlined
          >
          <v-card-title class="d-flex align-center justify-space-between">
            <h5 class="text-h5 font-weight-bold">$55/night</h5>
            <v-icon>favorite_border</v-icon>
          </v-card-title>
          <v-card-text>
            <!-- content -->
            <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <v-rating background-color="yellow lighten-3" length="5" value="4" color="yellow"></v-rating>
          </v-card-text>
          <v-card-actions>
            <span class="font-weight-medium mr-4">Agadir</span>
            <span class="font-weight-medium">23/05/2000</span>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CardAnnouncement",
  props: ["housesResult"]
};
</script>
