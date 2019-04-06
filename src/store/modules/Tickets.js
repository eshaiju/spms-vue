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
  },
  async deleteTicket({ commit }, id) {
    await api.deleteTicket(id).then(() => {
      commit("removeTicket", id);
    });
  }
};

const mutations = {
  addTickets: (state, payload) => (state.tickets = payload),
  removeTicket: (state, id) => {
    const newState = state.tickets.data.filter(val => val.id !== id);
    state.tickets = { data: [...newState] };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
