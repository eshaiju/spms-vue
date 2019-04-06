const state = {
  ticket_activity_logs: []
};

const getters = {
  ticket_activity_logs(state) {
    return state.ticket_activity_logs;
  }
};

const actions = {};

const mutations = {
  addTicketActivityLogs: (state, payload) =>
    (state.ticket_activity_logs = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
