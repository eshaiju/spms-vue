import api from "../../helpers/api";

const state = {
  statstics: null
};

const getters = {
  statstics(state) {
    return state.statstics;
  }
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
};

export default {
  state,
  getters,
  actions,
  mutations
};
