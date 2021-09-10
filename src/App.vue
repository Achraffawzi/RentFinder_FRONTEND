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
    this.$vuetify.theme.dark = false
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
