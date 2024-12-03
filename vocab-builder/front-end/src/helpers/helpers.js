import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";
import store from "@/store";

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});

const vm = new Vue();

const wordsURL = "http://localhost:3000/words/";
const baseURL = "http://localhost:3000/";

const handleError =
  (fn) =>
  (...params) =>
    fn(...params).catch((error) => {
      console.log(error);
      if (error.response && error.response.data.message) {
        vm.flash(error.response.data.message, "error")
      }
      else {
        vm.flash(error.message, "error")
      }
    });
  
function setToken() {
  axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
  );
}

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
      store.commit("destroyToken");
      vm.flash("Your session is expired! You should log in to renew session.", "error")
  }
  return Promise.reject(error);
});

export const api = {
  getWord: handleError(async (id) => {
    const res = await axios.get(wordsURL + id);
    return res.data;
  }),
  getWords: handleError(async (id) => {
    const res = await axios.get(wordsURL);
    return res.data;
  }),
  searchWords: handleError(async (term) => {
    const res = await axios.get(`${wordsURL}search?term=${term}`);
    return res.data;
  }),
  deleteWord: handleError(async (id) => {
    setToken();
    const res = await axios.delete(wordsURL + id);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    setToken();
    const res = await axios.post(wordsURL, payload);
    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    setToken();
    const res = await axios.put(wordsURL + payload._id, payload);
    return res.data;
  }),
  login: handleError(async (payload) => {
    const res = await axios.post(baseURL + "login", payload);
    return res.data;
  }),
  register: handleError(async (payload) => {
    const res = await axios.post(baseURL + "register", payload);
    return res.data;
  }),
};
