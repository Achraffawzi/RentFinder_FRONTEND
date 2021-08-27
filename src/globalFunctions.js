function tokenToObj(token) {
  // Convert the JWT To Object
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let tokenObj = JSON.parse(jsonPayload);
  return tokenObj;
}

export function getUserPathName(token) {
  // Convert the JWT To Object
  let tokenObj = tokenToObj(token);

  // Get the role
  switch (tokenObj.user.role) {
    case "User":
      return "home";

    case "HouseOwner":
      return "houseownerdashboard";

    case "Admin":
      return "/";

    default:
      return "/";
  }
}

export function getRoleFromToken(token) {
  // Convert the JWT To Object
  let tokenObj = tokenToObj(token);
  return tokenObj.role;
}

export function getUserObjFromToken(token) {
  // Convert the JWT To Object
  let tokenObj = tokenToObj(token);

  return tokenObj.user;
}
