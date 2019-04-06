import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Tickets from "./views/Tickets.vue";
import TicketActivityLogs from "./views/TicketActivityLogs.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/tickets",
      name: "tickets",
      component: Tickets,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/activity_logs",
      name: "activity_logs",
      component: TicketActivityLogs,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requireVisitor: true
      }
    }
  ]
});
