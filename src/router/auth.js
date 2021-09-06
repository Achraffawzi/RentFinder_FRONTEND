export function RoutesAuth(to, from, next) {
  if (from !== undefined) {
    let isSameRole = from.meta.authorizedRoles[0] == to.meta.authorizedRoles[0];
    let isDefault =
      to.meta.requiresAuth == false &&
      (from.meta.requiresAuth == false || from.meta.authorizedRoles[0] == "User");
      // forgot From = all and to = user contition
    if (isSameRole) {
      document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
      next();
    } else if (isDefault) {
      document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
      next();
    }
    else next({ name: "unauthorized" });
  }
};
