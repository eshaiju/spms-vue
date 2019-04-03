const state = {
  loading: false
};

const getters = {
  loaderStatus: (state) => state.loading
};

const actions = {
  startLoader({ commit }) {
    commit('startLoader');
  },
  stopLoader({ commit }) {
    commit('stopLoader');
  }
};

const mutations = {
  startLoader: (state) => state.loading = true,
  stopLoader: (state) => state.loading = false
};

export default {
  state,
  getters,
  actions,
  mutations
}
