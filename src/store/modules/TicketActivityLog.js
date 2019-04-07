const state = {
  ticket_activity_log: {
    data: {
      id: null,
      attributes: {
        activity: ""
      }
    }
  },
  ticketActivityLogForm: false
};

const getters = {
  ticket_activity_log(state) {
    return state.ticket_activity_log;
  },
  ticketActivityLogForm(state) {
    return state.ticketActivityLogForm;
  }
};

const actions = {
  async addTicketActivityLog({ commit }, ticket_activity_log) {
    commit("addTicketActivityLog", ticket_activity_log);
  },
  async closeTicketActivityLogForm({ commit }) {
    commit("closeTicketActivityLogForm");
  },
  async openTicketActivityLogForm({ commit }) {
    commit("openTicketActivityLogForm");
  }
};

const mutations = {
  addTicketActivityLog: (state, payload) =>
    (state.ticket_activity_log = payload),
  closeTicketActivityLogForm: state => (state.ticketActivityLogForm = false),
  openTicketActivityLogForm: state => (state.ticketActivityLogForm = true)
};

export default {
  state,
  getters,
  actions,
  mutations
};
