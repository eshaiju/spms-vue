import api from '../../helpers/api';
import localStore from 'store';
import { get } from 'lodash'
import router from "../../router";

const state = {
  user: null,
  error: null
};

const getters = {};

const actions = {
  login({ commit }, credentials) {
    api.login(credentials.email, credentials.password)
      .then(({ data }) => {
        const error = get(data, "error");
        if (error) {
          throw Error(error);
        }
        const accessToken = get(data, "auth_token");
        const user = get(data, "user");
        if (!accessToken) {
          throw Error("Unexpected error");
        }

        Promise.resolve(localStore.set("jwt", accessToken))
          .then(() => { 
            commit("signInUser", user);
            router.push({ name: "home" });
          });
      })
      .catch(error => {
        commit('saveError', {
          error: 'Invalid username/password'
        });
      });
  }
};

const mutations = {
  signInUser: (state, user) => (state.user = user),
  saveError: (state, payload) => (state.error = payload.error)
};

export default {
  state,
  getters,
  actions,
  mutations
}