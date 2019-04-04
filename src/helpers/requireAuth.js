import store from "../store";
import localStore from "store";

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "login"
      });
    } else {
      const token = localStore.get("jwt");
      if (!store.loggedIn && !(token === undefined)) {
        store.dispatch("refetchUser");
      }
      next();
    }
  } else if (to.matched.some(record => record.meta.requireVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
