<template>
  <div class="home">
    <Banner />
    <GlobalStatistics />

    <!-- Featured Houses -->
    <section class="featured-houses py-10">
      <v-container>
        <h4 class="text-h4 font-weight-bold mb-10">Featured Houses</h4>
        <CardAnnouncement :result="featuredAnnouncements"/>
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
          <Testimonial
            v-for="item in getFeaturedReviews"
            :key="item.photo"
            :review="item"
          />
        </carousel>
      </v-container>
    </section>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
import Banner from "@/components/home/Banner.vue";
import GlobalStatistics from "@/components/home/GlobalStatistics.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
import carousel from "vue-owl-carousel";
import Testimonial from "@/components/home/Testimonial.vue";
export default {
  name: "Home",

  components: {
    Banner,
    GlobalStatistics,
    CardAnnouncement,
    carousel,
    Testimonial,
  },

  data () {
    return {
      featuredAnnouncements: [],
    }
  },

  computed: {
    getFeaturedReviews() {
      return this.$store.getters.getFeaturedReviews;
    },
  },

  mounted() {
    this.getFeaturedAnnouncements();
  },

  methods: {
    async getFeaturedAnnouncements() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS);
        const response = await req.fetch();
        this.featuredAnnouncements = response.data;
      } catch(e) {
        console.log(e);
      }
    }
  }
};
</script>
