import Vue from "vue";
import Vuex from "vuex";
import VueFlashMessage from "vue-flash-message";
import { api } from "@/helpers/helpers";

Vue.use(Vuex);

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});

const vm = new Vue();

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token'),
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
    },
  },
  mutations: {
    updateStorage(state, { access }) {
      state.accessToken = access;
      localStorage.setItem('access_token', access);
    },
    destroyToken(state) {
      state.accessToken = null;
      localStorage.removeItem('access_token')
    },
  },
  actions: {
    userLogin(context, usercredentials) {
      return new Promise((resolve, reject) => {
        api
          .login({
            email: usercredentials.email,
            password: usercredentials.password,
          })
          .then((response) => {
            context.commit("updateStorage", {
              access: response.access_token,
            });
            resolve();
          }).catch((error) => { vm.flash("Authenticated failed with wrong email or password!", "error")});
      });
    },
    userLogout(context) {
      if (context.getters.loggedIn) {
        context.commit("destroyToken");
      }
    },
  },
  modules: {},
});
