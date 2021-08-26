import axios from "axios";

export const BASE_URL = "http://localhost:4000/";
// export const IMAGE_URL = "https://localhost:44373/images/";

export const END_POINTS = {
  AUTH_LOGIN: "auth/login",
  AUTH_REGISTER: "auth/signup",
  AUTH_CONFIRM_EMAIL: "auth/confirm",
  AUTH_FORGET_PASSWORD: "auth/forgetpassword",
  AUTH_RESET_PASSWORD: "auth/resetpassword",

  GET_ANNOUNCEMENTS: "announcements/",

  GET_FEEDBACKS: "feedback/"
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
    delete: () => authAxois.delete(url),
    update: (editedRecord) => authAxois.put(url, editedRecord),
  };
};
