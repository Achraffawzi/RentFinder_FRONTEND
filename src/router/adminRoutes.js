export default [
  {
    path: "/admindashboard",
    name: "admindashboard",
    component: () =>
      import(
        /* webpackChunkName: "admindashboard" */ "@/views/admin/AdminDashboard.vue"
      ),
    meta: {
      requiresAuth: true,
      authorizedRoles: ["Admin"]
    },
    children: [
      {
        path: "/statistics",
        name: "statistics",
        component: () =>
          import(
            /* webpackChunkName: "statistics" */ "@/views/admin/Statistics.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["Admin"]
        },
      },

      {
        path: "/houseowners",
        name: "houseowners",
        component: () =>
          import(
            /* webpackChunkName: "houseowners" */ "@/views/admin/HouseOwners.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["Admin"]
        },
      },

      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "users" */ "@/views/admin/Users.vue"),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["Admin"]
        },
      },

      {
        path: "/announcements",
        name: "announcements",
        component: () =>
          import(
            /* webpackChunkName: "announcements" */ "@/views/admin/Announcements.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["Admin"]
        },
      },
    ],
  },
];
