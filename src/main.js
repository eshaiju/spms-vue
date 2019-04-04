import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import requireAuth from "./helpers/requireAuth";
import store from "./store";
import interceptorsSetup from "./helpers/interceptors";

Vue.config.productionTip = false;
interceptorsSetup();
router.beforeEach(requireAuth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
