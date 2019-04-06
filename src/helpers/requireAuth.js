import store from "../store";
import localStore from "store";

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "login"
      });
    } else {
      if (!store.getters.user && !(localStore.get("jwt") === undefined)) {
        Promise.resolve(
          store.dispatch("refetchUser", localStore.get("jwt"))
        ).then(() => {
          next();
        });
      } else {
        next();
      }
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
