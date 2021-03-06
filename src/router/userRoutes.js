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
];
