import Vue from "vue";
import VeeValidate from "vee-validate";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import requireAuth from "./helpers/requireAuth";
import store from "./store";
import interceptorsSetup from "./helpers/interceptors";
import "./assets/css/style.css";
import fullCalendar from "vue-fullcalendar";
Vue.component("full-calendar", fullCalendar);

Vue.config.productionTip = false;
router.beforeEach(requireAuth);
interceptorsSetup();
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
