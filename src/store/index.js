import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    darkMode: null,
  },

  plugins: [createPersistedState()],

  mutations: {
    setUser(state, payload) {
      state.user = Object.assign({}, payload);
    },

    setDarkMode(state, payload) {
      state.darkMode = payload;
    },
  },

  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
    },
    setDarkMode(context, payload) {
      context.commit("setDarkMode", payload);
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getDarkModeStatus(state) {
      return state.darkMode;
    }
  },
});
