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
    },
  ];
  