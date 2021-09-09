<template>
  <div class="home">
    <BaseSnackbar
      v-if="show"
      :show="show"
      :message="snackbarMsg"
      :color="snackbarColor"
      v-on:closeSnackbar="show = false"
    />
    <Banner />
    <GlobalStatistics v-if="statistics" :statistics="statistics" />

    <!-- Featured Houses -->
    <section class="featured-houses py-10">
      <v-container>
        <h4 class="text-h4 font-weight-bold mb-10">Featured Houses</h4>
        <CardAnnouncement
          :result="featuredAnnouncements"
          v-if="featuredAnnouncements.length > 0"
        />
        <p v-else class="third--text text-h5 font-weight-medium">
          There are no featured houses yet
        </p>
      </v-container>
    </section>

    <!-- Testimonial -->
    <section class="testimonial py-16">
      <v-container>
        <Testimonial :feedbacks="feedbacks" />
        <!-- Dialog for giving feedback -->
        <v-dialog v-if="getUser" v-model="dialogFeedback" width="500">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center justify-center mt-16">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Share your oppinion on us
            </v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              share your feedback with others!
            </v-card-title>

            <v-card-text>
              <v-rating
                v-model="newRating.value"
                :value="newRating.value"
                color="primary"
                hover
                length="5"
                size="25"
              ></v-rating>
              <v-form ref="opinionForm">
                <v-textarea
                  v-model="newRating.content"
                  :rules="opinionRule"
                  label="Opinion"
                ></v-textarea>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="onCreateFeedback">
                share feedback
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </section>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
import BaseSnackbar from "@/components/BaseSnackbar.vue";
import Banner from "@/components/home/Banner.vue";
import GlobalStatistics from "@/components/home/GlobalStatistics.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
import Testimonial from "@/components/home/Testimonial.vue";
export default {
  name: "Home",

  components: {
    BaseSnackbar,
    Banner,
    GlobalStatistics,
    CardAnnouncement,
    Testimonial,
  },

  data() {
    return {
      show: false,
      snackbarMsg: "",
      snackbarColor: "",

      // START HERE
      featuredAnnouncements: null,
      feedbacks: [],
      statistics: null,

      dialogFeedback: false,
      newRating: {
        content: "",
        value: 0,
      },

      opinionRule: [
        (value) =>
          value.length >= 20 || "Opinion must be 20 characters or more",
      ],
    };
  },

  computed: {
    getFeaturedReviews() {
      return this.$store.getters.getFeaturedReviews;
    },

    getUser() {
      return this.$store.getters.getUser;
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

    async onCreateFeedback() {
      if (this.$refs.opinionForm.validate()) {
        try {
          const req = createApiEndPoints(END_POINTS.CREATE_FEEDBACK);
          const response = await req.create({ ...this.newRating });
          console.log(response);
          this.show = true;
          this.snackbarMsg = response.data.message;
          this.snackbarColor = "success";
        } catch (e) {
          console.log(e);
          this.show = true;
          this.snackbarMsg =
            "something went wrong. Maybe you already gave us a feedback!";
          this.snackbarColor = "error";
        }
      } else {
        this.show = true;
        this.snackbarMsg =
          "Please check feedback fields.";
        this.snackbarColor = "error";
      }

      this.dialog = false;
    },
  },
};
</script>
