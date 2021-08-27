<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: { Footer },

  data: () => ({
    //
  }),

  mounted() {
    // Get the most starred reviews
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
