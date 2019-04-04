import localStore from "store";

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!localStore.get("jwt")) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireVisitor)) {
    if (localStore.get("jwt")) {
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
