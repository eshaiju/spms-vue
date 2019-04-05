import axios from "axios";
import localStore from "store";

const token = localStore.get("jwt");

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common = {
  Authorization: `bearer ${token}`
};

const api = {
  login: (email, password) =>
    axios
      .post("api/v1/login", {
        email,
        password,
        password_confirmation: password
      })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err)),
  validate_token: token =>
    axios
      .post("api/v1/validate_token", {}, { Authorization: `bearer ${token}` })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err)),
  dashboard: () =>
    axios
      .get("api/v1/dashboard", {})
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
};

export default api;
