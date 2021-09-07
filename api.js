import axios from "axios";

export const BASE_URL = "http://localhost:4000/";
// export const IMAGE_URL = "https://localhost:44373/images/";

export const END_POINTS = {
  AUTH_LOGIN: "auth/login",
  AUTH_REGISTER: "auth/signup",
  AUTH_CONFIRM_EMAIL: "auth/confirm",
  AUTH_FORGET_PASSWORD: "auth/forgetpassword",
  AUTH_RESET_PASSWORD: "auth/resetpassword",
  
  CREATE_ANNOUNCEMENT: "announcements/create",
  GET_ANNOUNCEMENTS: "announcements/",
  GET_ANNOUNCEMENTS_OF_USER: "announcements/mine",
  GET_ANNOUNCEMENT_BY_ID: "announcements/",
  DELETE_ANNOUNCEMENT: "announcements/",
  GET_ANNOUNCEMENTS_ANALYTICS: "announcements/analytics",
  
  GET_FEEDBACKS: "feedback/",
  
  GET_FAVORITES: "favorite/all",
  CREATE_FAVORITE: "favorite/add",
  DELETE_FAVORITE: "favorite/delete",
  
  GET_USER_INFO: "profile/me",
  UPDATE_PROFILE: "profile/me/edit",
  CHANGE_PASSWORD: "profile/me/edit/password",

  GET_ANALYTICS: "analytics/",

  GET_ALL_USERS: "admin/users/all",
  DELETE_USER: "admin/users/delete",
};

export const authAxois = axios.create({
  BASE_URL: BASE_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("L_T"),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

export const createApiEndPoints = (endPoint) => {
  let url = BASE_URL + endPoint;
  return {
    fetch: () => authAxois.get(url),
    create: (newRecord) => authAxois.post(url, newRecord),
    delete: (deletedRecord) => authAxois.delete(url, deletedRecord),
    deleteFromParams: () => authAxois.delete(url),
    update: (editedRecord) => authAxois.put(url, editedRecord),
  };
};
