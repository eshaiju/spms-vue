import api from "../../helpers/api";

const state = {
  statstics: null,
  tickets: [],
  ticket_activity_logs: []
};

const getters = {
  statstics(state) {
    return state.statstics;
  },
  tickets(state) {
    return state.tickets;
  },
  ticket_activity_logs(state) {
    return state.ticket_activity_logs;
  },
};

const actions = {
  async fetchDashboardData({ commit }) {
    await api.dashboard().then(({ data }) => {
      const {
        dashboard: {
          data: {
            attributes: {
              tickets,
              ticket_activity_logs,
              total_hours_in_current_month,
              total_activities_of_current_month,
              total_tickets_of_current_month,
              total_hours_in_previous_month
            }
          }
        }
      } = data;
      commit("addDashboardStatistics", {
        total_hours_in_current_month,
        total_activities_of_current_month,
        total_tickets_of_current_month,
        total_hours_in_previous_month
      });
      commit("addTickets", tickets);
      commit("addTicketActivityLogs", ticket_activity_logs);
    });
  }
};

const mutations = {
  addDashboardStatistics: (state, payload) => (state.statstics = payload),
  addTickets: (state, payload) => (state.tickets = payload),
  addTicketActivityLogs: (state, payload) =>
    (state.ticket_activity_logs = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
