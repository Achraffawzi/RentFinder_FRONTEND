import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import UserRoutes from "./userRoutes.js";
import houseOwnerRoutes from "./houseOwnerRoutes.js";
import adminRoutes from "./adminRoutes.js";

Vue.use(VueRouter);

const routes = [
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
    component: () =>
      import(/* webpackChunkName: "search" */ "@/views/Search.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "@/views/Signup.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/announcementdetails/:id",
    name: "announcementdetails",
    component: () =>
      import(
        /* webpackChunkName: "announcementdetails" */ "@/views/AnnouncementDetails.vue"
      ),
    props: true,
    meta: {
      requiresAuth: false,
    },
  },
  ...adminRoutes,
  ...houseOwnerRoutes,
  ...UserRoutes,

  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () =>
      import(
        /* webpackChunkName: "unauthorized" */ "@/views/Unauthorized.vue"
      ),
  },

  {
    path: "*",
    name: "notfound",
    component: () =>
      import(
        /* webpackChunkName: "notfound" */ "@/views/404.vue"
      ),
  }
];

// If logged in and wants to go to signup or login (or favorite if he's house owner or admin)
// if from.meta.requiresAuth == true (other thing is handled by the other func)
// else next()
// routes.push(UserRoutes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
  next();
});

export default router;
