const state = {
  tickets: []
};

const getters = {
  tickets(state) {
    return state.tickets;
  }
};

const actions = {};

const mutations = {
  addTickets: (state, payload) => (state.tickets = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
