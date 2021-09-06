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
];
