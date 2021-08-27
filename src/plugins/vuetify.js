import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#008DE9",
        secondary: "#333333",
        third: "#949393",
        navigationDrawer: "#122658",
        error: "#b71c1c",
      },
    },
  },
});
