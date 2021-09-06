<template>
  <div class="home">
    <Banner />
    <GlobalStatistics v-if="statistics" :statistics="statistics"/>

    <!-- Featured Houses -->
    <section class="featured-houses py-10">
      <v-container>
        <h4 class="text-h4 font-weight-bold mb-10">Featured Houses</h4>
        <CardAnnouncement :result="featuredAnnouncements" v-if="featuredAnnouncements.length > 0" />
          <p v-else class="third--text text-h5 font-weight-medium">There are no featured houses yet</p>
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
      statistics: null,
    };
  },

  computed: {
    getFeaturedReviews() {
      return this.$store.getters.getFeaturedReviews;
    },
  },

  mounted() {
    this.getAnalytics();
    this.getFeaturedAnnouncements();
    this.getFeedbacks();
  },

  methods: {
    async getAnalytics() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANALYTICS);
        const response = await req.fetch();
        this.statistics = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getFeaturedAnnouncements() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS);
        const response = await req.fetch();
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
