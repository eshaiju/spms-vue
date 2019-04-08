const state = {
  ticket: {
    data: {
      id: null,
      attributes: {
        title: ""
      }
    }
  },
  ticketForm: false
};

const getters = {
  ticket(state) {
    return state.ticket;
  },
  ticketForm(state) {
    return state.ticketForm;
  }
};

const actions = {
  async addTicket({ commit }, ticket) {
    commit("addTicket", ticket);
  },
  async closeTicketForm({ commit }) {
    commit("closeTicketForm");
  },
  async openTicketForm({ commit }) {
    commit("openTicketForm");
  }
};

const mutations = {
  addTicket: (state, payload) => (state.ticket = payload),
  closeTicketForm: state => (state.ticketForm = false),
  openTicketForm: state => (state.ticketForm = true)
};

export default {
  state,
  getters,
  actions,
  mutations
};
