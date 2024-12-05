import Vue from "vue";
import Vuex from "vuex";
import VueFlashMessage from "vue-flash-message";
import { api } from "@/helpers/helpers";
import { jwtDecode } from "jwt-decode";

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
    user: {
      first_name: localStorage.getItem('first_name'),
      last_name: localStorage.getItem('last_name'),
    },
    exp: localStorage.getItem('exp'),
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    updateStorage(state, { access }) {
      state.accessToken = access;
      localStorage.setItem('access_token', access);
      const payload = jwtDecode(access, { payload: true })
      state.user = {
        first_name: payload.first_name,
        last_name: payload.last_name
      };
      localStorage.setItem('first_name', payload.first_name);
      localStorage.setItem('last_name', payload.last_name);
      localStorage.setItem('exp', payload.exp);
    },
    destroyToken(state) {
      state.accessToken = null;
      localStorage.removeItem('access_token');
      state.first_name = null;
      state.last_name = null;
      localStorage.removeItem('first_name')
      localStorage.removeItem('last_name')
      localStorage.removeItem('exp')
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
          }).catch((error) => {});
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
