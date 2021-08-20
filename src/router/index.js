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
  {
    path: "/search",
    name: "search",
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
    meta: {
      requiresAuth: false,
    },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
