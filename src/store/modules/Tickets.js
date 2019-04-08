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
  },
  async saveTicket({ commit }, ticket) {
    await api.createTicket(ticket).then(({ data }) => {
      const { ticket } = data;
      commit("pushToTickets", ticket);
    });
  },
  async updateTicket({ commit }, ticket) {
    await api.updateTicket(ticket, ticket.id).then(({ data }) => {
      const { ticket } = data;
      commit("updateTickets", ticket);
    });
  }
};

const mutations = {
  addTickets: (state, payload) => (state.tickets = payload),
  removeTicket: (state, id) => {
    const newState = state.tickets.data.filter(val => val.id !== id);
    state.tickets = { data: [...newState] };
  },
  pushToTickets: (state, payload) => {
    state.tickets = {
      data: [payload.data, ...state.tickets.data]
    };
  },
  updateTickets: (state, payload) => {
    let index = state.tickets.data.indexOf(
      find(state.tickets.data, ["id", payload.data.id])
    );
    if (index >= 0) {
      state.tickets.data.splice(index, 1, payload.data);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
