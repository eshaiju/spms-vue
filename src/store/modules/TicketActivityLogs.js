import api from "../../helpers/api";
import { async } from "q";

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
  },
  async saveTicketActivity({ commit }, ticket_activity_log) {
    await api.createTicketActivityLog(ticket_activity_log).then(({ data }) => {
      const { ticket_activity_log } = data;
      commit("pushToTicketActivityLogs", ticket_activity_log);
    });
  },
  async updateTicketActivity({ commit }, ticket_activity_log, id) {
    await api
      .updateTicketActivityLog(ticket_activity_log, id)
      .then(({ data }) => {
        const { ticket_activity_log } = data;
        commit("updateTicketActivityLogs", ticket_activity_log);
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
  },
  pushToTicketActivityLogs: (state, payload) => {
    state.ticket_activity_logs = {
      data: [payload.data, ...state.ticket_activity_logs.data]
    };
  },
  updateTicketActivityLogs: (state, payload) => {
    let index = state.ticket_activity_logs.data.indexOf(
      find(state.ticket_activity_logs.data, ["id", payload.data.id])
    );
    state.ticket_activity_logs.data.splice(index, 1, payload.data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
