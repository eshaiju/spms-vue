import axios from "axios";
import store from "../store";

export default function setup() {
  axios.interceptors.request.use(
    config => {
      store.dispatch("startLoader");
      return config;
    },
    error => {
      store.dispatch("stopLoader");
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      store.dispatch("stopLoader");
      return response;
    },
    error => {
      store.dispatch("stopLoader");
      return Promise.reject(error);
    }
  );
}
