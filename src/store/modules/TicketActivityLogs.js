import api from "../../helpers/api";

const state = {
  ticket_activity_logs: []
};

const getters = {
  ticket_activity_logs(state) {
    return state.ticket_activity_logs;
  }
};

const actions = {
  async fetchTicketActivityLogs({ commit }, user) {
    await api.ticketActivityLogs(user).then(({ data }) => {
      const { ticket_activity_logs } = data;
      commit("addTicketActivityLogs", ticket_activity_logs);
    });
  },
  async deleteTicketActivityLog({ commit }, id) {
    await api.deleteTicketActivityLog(id).then(() => {
      commit("removeTicketActivityLog", id);
    });
  }
};

const mutations = {
  addTicketActivityLogs: (state, payload) =>
    (state.ticket_activity_logs = payload),
  removeTicketActivityLog: (state, id) => {
    const newState = state.ticket_activity_logs.data.filter(
      val => val.id !== id
    );
    state.ticket_activity_logs = { data: [...newState] };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
