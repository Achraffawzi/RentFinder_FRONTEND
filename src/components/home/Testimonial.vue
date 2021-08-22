<template>
  <div class="testomonial text-center">
    <v-card outlined max-width="600" class="pa-4 mx-auto">
      <v-avatar size="100">
        <img :src="review.photo" alt="" />
      </v-avatar>
      <h4 class="text-h4 font-weight-medium my-3">{{ review.firstname }} {{ review.lastname }}</h4>
      <v-rating
        size="20"
        background-color="yellow lighten-3"
        length="5"
        color="yellow"
        :value="review.num_rating"
        readonly
      ></v-rating>
      <v-card-text>
        <p>
          {{review.text}}
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Testimonial",
  props: ["review"],
};
</script>
