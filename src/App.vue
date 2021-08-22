<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  mounted() {
    // Get the most starred reviews
    this.setFeaturedReviews();
  },

  methods: {
    setFeaturedReviews () {
      // Get the data from the API
      const featuredReviews = [
        {
          photo: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2FBeautiful-luxury-home-exterior-at-twilight%2F960x0.jpg%3Ffit%3Dscale",
          firstname: "Elon",
          lastname: "Musk",
          num_rating: 5,
          text: "I love it so much like you guys have no idea how great the service is. Highly recomanded!"
        },
        {
          photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROk71ayhtqVt33k6lkag6slMUCM81bYEbkCfSZ5o9pOj68OydKtWc8q5CKjAuFCkZGrq4&usqp=CAU",
          firstname: "Elon",
          lastname: "Musk",
          num_rating: 5,
          text: "I love it so much like you guys have no idea how great the service is. Highly recomanded!"
        },
      ]
      this.$store.dispatch('setFeaturedReviews', featuredReviews);
    },
  }
};
</script>
