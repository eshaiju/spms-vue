import axios from "axios";
import localStore from "store";
import { isEmpty } from "loadsh";

const token = localStore.get("jwt");

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common = {
  Authorization: `bearer ${token}`
};

axios.interceptors.request.use(config => {
  if (isEmpty(token)) {
    config.headers.common = {
      Authorization: `bearer ${localStore.get("jwt")}`
    };
  }
  return config;
});

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
      .get("api/v1/dashboard", {}, { Authorization: `bearer ${token}` })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err)),
  tickets: user =>
    axios
      .get("api/v1/tickets", { params: { assigned_user_id: user.id } })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
};

export default api;
