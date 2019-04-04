import axios from "axios";
import localStore from "store";

const token = localStore.get("jwt");

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.baseURL = "https://spms-rails-staging.herokuapp.com/api/v1";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

const api = {
  login: (email, password) =>
    axios
      .post("/login", { email, password, password_confirmation: password })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
};

export default api;
