<template>
  <div class="banner d-flex flex-column justify-space-between">
    <Navbar />

    <!-- Intro text -->
    <v-container>
      <p class="text-h1 font-weight-medium white--text mb-3 banner__title">
        Find Your Best And Most Suitable House
      </p>
      <p class="white--text">
        Here you can find thousands of beautiful and modern houses waiting for
        you
      </p>
    </v-container>

    <!-- Bottom showcase -->
    <div class="d-flex">
      <img
        :src="require('@/assets/images/banner-image.png')"
        class="banner__image"
        alt="Beautiful home"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Banner",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.banner {
  background: linear-gradient(to right, #7ea1b7, #a1bfd3);
  min-height: 100vh;

  .banner__image {
    width: 400px;
  }
}

@media screen and (max-width: 600px) {
  .banner__title {
    font-size: 50px !important;
    line-height: 1.3;
  }
}
</style>
