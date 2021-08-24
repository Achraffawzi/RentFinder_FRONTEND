import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    announcements: [
      {
        id: "1",
        city: "Agadir",
        photos: [
          "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2FBeautiful-luxury-home-exterior-at-twilight%2F960x0.jpg%3Ffit%3Dscale",
        ],
        title: "title 1",
        price: 1,
        description:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
        totalfloors: 1,
        totalbathrooms: 1,
        totallivingrooms: 1,
        totalkitchens: 1,
        totalbedrooms: 1,
        surface: 1,
        publicationDate: "23-05-2021",
        rating: 4,
      },
      {
        id: "2",
        city: "Tangier",
        photos: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROk71ayhtqVt33k6lkag6slMUCM81bYEbkCfSZ5o9pOj68OydKtWc8q5CKjAuFCkZGrq4&usqp=CAU",
        ],
        title: "title 2",
        price: 2,
        description:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
        totalfloors: 2,
        totalbathrooms: 2,
        totallivingrooms: 2,
        totalkitchens: 2,
        totalbedrooms: 2,
        surface: 2,
        publicationDate: "24-06-2021",
        rating: 5,
      },
      {
        id: "3",
        city: "Tangier",
        photos: [
          "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2FBeautiful-luxury-home-exterior-at-twilight%2F960x0.jpg%3Ffit%3Dscale",
        ],
        title: "In publishing and graphic design, Lorem ipsum",
        price: 3,
        description:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
        totalfloors: 3,
        totalbathrooms: 3,
        totallivingrooms: 3,
        totalkitchens: 3,
        totalbedrooms: 3,
        surface: 3,
        publicationDate: "24-06-2021",
        rating: 3,
      },
    ],
    user: {},
    featuredReviews: null,
  },
  mutations: {
    setFeaturedReviews(state, payload) {
      state.featuredReviews = [...payload];
    },
  },
  actions: {
    setFeaturedReviews(context, payload) {
      context.commit("setFeaturedReviews", payload);
    },
  },
  getters: {
    getAnnouncements: (state) => {
      return state.announcements;
    },
    searchedAnnouncements: (state) => (payload) => {
      console.log("payload: " + payload.city);
      return state.announcements
        .filter((announcement) => announcement.city.includes(payload.city))
        .sort((announcementA, announcementB) => {
          return announcementA.publicationdate > announcementB.publicationdate;
        });
    },
    getAnnouncement: (state) => (announcementID) => {
      return state.announcements.find(
        (ann) => ann.id.toString() === announcementID.toString()
      );
    },
    getFeaturedReviews: (state) => {
      return state.featuredReviews;
    },
  },
});
