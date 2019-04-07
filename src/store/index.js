import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import loader from "./modules/loader";
import Dashboard from "./modules/Dashboard";
import Tickets from "./modules/Tickets";
import TicketActivityLogs from "./modules/TicketActivityLogs";
import TicketActivityLog from "./modules/TicketActivityLog";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    login,
    Dashboard,
    Tickets,
    TicketActivityLogs,
    TicketActivityLog
  }
});
