import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";

import UserRoutes from "./userRoutes.js";
import houseOwnerRoutes from "./houseOwnerRoutes.js";
import adminRoutes from "./adminRoutes.js";

// import { getRoleFromToken } from "../globalFunctions.js"; 

// import { RoutesAuth } from "../router/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: false,
      authorizedRoles: ["All"],
    },
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "@/views/Search.vue"),
    meta: {
      requiresAuth: false,
      authorizedRoles: ["All"],
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "@/views/Signup.vue"),
    meta: {
      requiresAuth: false,
      authorizedRoles: ["All"],
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: {
      requiresAuth: false,
      authorizedRoles: ["All"],
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
      authorizedRoles: ["All"],
    },
  },
  ...adminRoutes,
  ...houseOwnerRoutes,
  ...UserRoutes,

  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () =>
      import(/* webpackChunkName: "unauthorized" */ "@/views/Unauthorized.vue"),
  },

  {
    path: "*",
    name: "notfound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "@/views/404.vue"),
  },
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

// forgot From = all and to = user contition
// router.beforeEach((to, from, next) => {
//   if (from !== undefined) {
//     console.log("from => " + from.name); // null
//     console.log("to => " + to.name); // search
//     let userRole = getRoleFromToken(localStorage.getItem('L_T'));
//     let isSameRole = from.meta.authorizedRoles[0] == to.meta.authorizedRoles[0] == userRole;
//     let isDefault =
//       to.meta.requiresAuth == false &&
//       (from.meta.requiresAuth == false || from.meta.authorizedRoles[0] == "User");
//     if (isSameRole) {
//       console.log("inside the first one");
//       next();
//       document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
//     } else if (isDefault) {
//       console.log("inside the seconds one");
//       next();
//       document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
//     } else next({ name: "unauthorized" });
//   }
// });

export default router;
