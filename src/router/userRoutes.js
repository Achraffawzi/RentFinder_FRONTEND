export default [
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName: "favorite" */ "@/views/user/Favorite.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["User"]
    },
  },
  {
    path: "/settings",
    name: "usersettings",
    component: () =>
      import(
        /* webpackChunkName: "usersettings" */ "@/views/user/Settings.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["User"]
    },
    children: [
      {
        path: "/settings/editprofile",
        name: "usereditprofile",
        component: () =>
          import(
            /* webpackChunkName: "usereditprofile" */ "@/views/user/EditProfile.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["User"]
        },
      },

      {
        path: "/settings/changepassword",
        name: "userchangepassword",
        component: () =>
          import(
            /* webpackChunkName: "userchangepassword" */ "@/views/user/ChangePassword.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["User"]
        },
      },
    ],
  },
];
