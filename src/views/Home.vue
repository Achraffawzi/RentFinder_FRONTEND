<template>
  <div class="home">
    <Banner />
    <GlobalStatistics />

    <!-- Featured Houses -->
    <section class="featured-houses py-10">
      <v-container>
        <h4 class="text-h4 font-weight-bold mb-10">Featured Houses</h4>
        <CardAnnouncement :result="featuredAnnouncements" />
      </v-container>
    </section>

    <!-- Testimonial -->
    <section class="testimonial py-16">
      <v-container>
        <Testimonial :feedbacks="feedbacks" />
      </v-container>
    </section>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
import Banner from "@/components/home/Banner.vue";
import GlobalStatistics from "@/components/home/GlobalStatistics.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
import Testimonial from "@/components/home/Testimonial.vue";
export default {
  name: "Home",

  components: {
    Banner,
    GlobalStatistics,
    CardAnnouncement,
    Testimonial,
  },

  data() {
    return {
      // START HERE
      featuredAnnouncements: null,
      feedbacks: [],
    };
  },

  computed: {
    getFeaturedReviews() {
      return this.$store.getters.getFeaturedReviews;
    },
  },

  mounted() {
    this.getFeaturedAnnouncements();
    this.getFeedbacks();
  },

  methods: {
    async getFeaturedAnnouncements() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS);
        const response = await req.fetch();
        // this.featuredAnnouncements = [...response.data.slice(0, 4), isFaved = false];
        this.featuredAnnouncements = response.data.slice(0, 4);
      } catch (e) {
        console.log(e);
      }
    },

    async getFeedbacks() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_FEEDBACKS);
        const response = await req.fetch();
        this.feedbacks = response.data.slice(0, 8);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
