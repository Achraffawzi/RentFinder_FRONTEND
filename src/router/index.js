import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue"

Vue.use(VueRouter);

const routes = [
  // Outter routes
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
