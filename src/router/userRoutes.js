export default [
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName: "favorite" */ "@/views/Favorite.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];