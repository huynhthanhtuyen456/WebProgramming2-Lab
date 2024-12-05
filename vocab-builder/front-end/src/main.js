import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

import "semantic-ui-css/semantic.css";
import store from "./store";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (store.state.exp && store.state.exp * 1000 < Date.now()) {
    store.commit("destroyToken");
    next()
  }
  if (to.meta.requiresAuth) {
    if (store.state.accessToken != null) next();
    else next("login");
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
