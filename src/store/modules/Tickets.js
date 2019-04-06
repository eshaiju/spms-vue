import api from "../../helpers/api";

const state = {
  tickets: []
};

const getters = {
  tickets(state) {
    return state.tickets;
  }
};

const actions = {
  async fetchTickets({ commit }, user) {
    await api.tickets(user).then(({ data }) => {
      const { tickets } = data;
      commit("addTickets", tickets);
    });
  }
};

const mutations = {
  addTickets: (state, payload) => (state.tickets = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
