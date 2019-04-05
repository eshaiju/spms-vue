import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import requireAuth from "./helpers/requireAuth";
import store from "./store";
import interceptorsSetup from "./helpers/interceptors";
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";

Vue.config.productionTip = false;
interceptorsSetup();
router.beforeEach(requireAuth);

Vue.use(FullCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
