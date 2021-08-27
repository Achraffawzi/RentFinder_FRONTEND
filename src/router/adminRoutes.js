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
        },
      },

      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "users" */ "@/views/admin/Users.vue"),
        meta: {
          requiresAuth: true,
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
        },
      },

      {
        path: "/settings",
        name: "settings",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/views/admin/Settings.vue"
          ),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "/settings/editprofile",
            name: "admineditprofile",
            component: () =>
              import(
                /* webpackChunkName: "admineditprofile" */ "@/views/admin/EditProfile.vue"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/settings/changepassword",
            name: "adminchangepassword",
            component: () =>
              import(
                /* webpackChunkName: "adminchangepassword" */ "@/views/admin/ChangePassword.vue"
              ),
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
];
