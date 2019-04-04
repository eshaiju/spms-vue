import api from "../../helpers/api";
import localStore from "store";
import { get } from "lodash";
import router from "../../router";

const state = {
  user: null,
  error: null,
  token: localStore.get("jwt") || null
};

const getters = {
  loggedIn(state) {
    return state.token != null;
  },
  loginError(state) {
    return state.error;
  }
};

const actions = {
  async login({ commit }, credentials) {
    await api
      .login(credentials.email, credentials.password)
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
            commit("signInUser", { user, accessToken });
            router.push({ name: "home" });
          })
          .catch(() => {});
      })
      .catch(() => {
        commit("saveError", {
          error: "Invalid username/password"
        });
      });
  },
  async signOutUser({ commit }) {
    commit("signOutUser");
  }
};

const mutations = {
  signInUser: (state, payload) => {
    (state.user = payload.user), (state.error = null), (state.token = payload.accessToken);
  },
  signOutUser: state => {
    (state.user = null), (state.token = null);
  },
  saveError: (state, payload) => (state.error = payload.error)
};

export default {
  state,
  getters,
  actions,
  mutations
};
