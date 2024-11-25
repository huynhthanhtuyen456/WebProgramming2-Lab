import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";

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
  deleteWord: handleError(async (id) => {
    const res = await axios.delete(wordsURL + id);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    const res = await axios.post(wordsURL, payload);
    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    const res = await axios.put(wordsURL + payload._id, payload);
    return res.data;
  }),
  login: handleError(async (payload) => {
    const res = await axios.post(baseURL + "login", payload);
    console.log(res.data);
    return res.data;
  }),
};
