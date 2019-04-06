import Vue from "vue";
import VeeValidate from "vee-validate";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import requireAuth from "./helpers/requireAuth";
import store from "./store";
import interceptorsSetup from "./helpers/interceptors";
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";

Vue.config.productionTip = false;
router.beforeEach(requireAuth);
interceptorsSetup();
Vue.use(FullCalendar);
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
