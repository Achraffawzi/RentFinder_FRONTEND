<template>
  <div class="testomonial text-center">
    <carousel
      v-if="feedbacks.length > 0"
      :nav="false"
      :responsive="{
        0: { items: 1, nav: false },
        600: { items: 1, nav: false },
      }"
    >
      <v-card
        v-for="feedback in feedbacks"
        :key="feedback.Id"
        outlined
        max-width="600"
        class="pa-4 mx-auto"
      >
        <v-avatar size="100">
          <img
            :src="feedback.Avatar === 'default-profile-image.jpg' ? 'http://localhost:4000/static/images/user/default-profile-image.jpg' : feedback.Avatar"
            alt=""
          />
        </v-avatar>
        <h4 class="text-h4 font-weight-medium my-3">Ella Johnson</h4>
        <v-rating
          size="20"
          background-color="yellow lighten-3"
          length="5"
          color="yellow"
          :value="feedback.Value"
          readonly
        ></v-rating>
        <v-card-text>
          <p>
            {{ feedback.Content }}
          </p>
        </v-card-text>
      </v-card>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
  name: "Testimonial",

  components: { carousel },

  props: ["feedbacks"],
};
</script>
