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

  watch: {
    $route() {
      if (this.$route.name !== 'houseownerdashboard') {
        this.$vuetify.theme.dark = false;
      }
    }
  },

  mounted() {
    this.$vuetify.theme.dark = false
  },

  methods: {},
};
</script>

<style lang="scss">
html {
  scrollbar-width: thin;
}

html::-webkit-scrollbar {
  width: 1vw;
}
 
html::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
html::-webkit-scrollbar-thumb {
  background-color: rgba(0, 141, 233, .7);
  outline: 1px solid slategrey;
}

html::-webkit-scrollbar-thumb:hover {
  background-color: $primary-color;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
