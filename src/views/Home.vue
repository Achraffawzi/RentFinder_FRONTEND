<template>
  <div class="home">
    <Banner />
    <GlobalStatistics />

    <!-- Featured Houses -->
    <section class="featured-houses py-10">
      <v-container>
        <h4 class="text-h4 font-weight-bold mb-10">Featured Houses</h4>
        <CardAnnouncement />
      </v-container>
    </section>

    <!-- Testimonial -->
    <section class="testimonial py-16">
      <v-container>
        <carousel
          :nav="false"
          :responsive="{
            0: { items: 1, nav: false },
            600: { items: 1, nav: false },
          }"
          :center="true"
        >
          <Testimonial />
        </carousel>
      </v-container>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Banner from "@/components/home/Banner.vue";
import GlobalStatistics from "@/components/GlobalStatistics.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
import carousel from "vue-owl-carousel";
import Testimonial from "@/components/home/Testimonial.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Home",
  components: {
    Banner,
    GlobalStatistics,
    CardAnnouncement,
    carousel,
    Testimonial,
    Footer,
  },
};
</script>
