<template>
  <div class="favorite">
    <Navbar />

    <v-container>
      <!-- favorite houses section  -->
      <h4 class="text-h4 font-weight-bold mb-10">Favorite Houses</h4>
      <CardAnnouncement :result="result" />
    </v-container>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../../api.js";
import Navbar from "@/components/Navbar.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
export default {
  name: "Favorite",
  components: {
    CardAnnouncement,
    Navbar,
  },
  data() {
    return {
      result: null,
    };
  },

  mounted() {
    this.getFavedAnnouncements();
  },

  methods: {
    async getFavedAnnouncements() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_FAVORITES);
        const response = await req.fetch();
        console.log(response);
        this.result = response.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
