export default [
  {
    path: "/houseownerdashboard/",
    name: "houseownerdashboard",
    component: () =>
      import(
        /* webpackChunkName: "houseownerdashboard" */ "@/views/houseOwner/HouseOwnerDashboard.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      authorizedRoles: ["HouseOwner"]
    },
  },

  {
    path: "/houseownersettings",
    name: "houseownersettings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "@/views/houseOwner/Settings.vue"
      ),
    meta: {
      requiresAuth: true,
      authorizedRoles: ["HouseOwner"]
    },
    children: [
      {
        path: "/houseownersettings/houseownereditprofile",
        name: "houseownereditprofile",
        component: () =>
          import(
            /* webpackChunkName: "houseownereditprofile" */ "@/views/houseOwner/EditProfile.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["HouseOwner"]
        },
      },

      {
        path: "/houseownersettings/houseownerchangepassword",
        name: "houseownerchangepassword",
        component: () =>
          import(
            /* webpackChunkName: "houseownerchangepassword" */ "@/views/houseOwner/ChangePassword.vue"
          ),
        meta: {
          requiresAuth: true,
          authorizedRoles: ["HouseOwner"]
        },
      },
    ],
  },
];
