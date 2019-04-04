import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./components/Login.vue";

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
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requireVisitor: true
      }
    }
  ]
});
