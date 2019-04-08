<template>
  <div>
    <h2>Ticket Activities</h2><br/>
    <v-btn
      color="primary"
      dark
      @click.stop="openTicketActivityLogForm()"
    >
      Create New Activity
    </v-btn>
    <TicketActivityForm />
    <TicketActivityList :ticket_activity_logs="ticket_activity_logs.data" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TicketActivityList from '../components/TicketActivityLogs/TicketActivityList';
import TicketActivityForm from '../components/TicketActivityLogs/TicketActivityForm';

export default {
  name: "TicketActivityLogs",
  components: {
    TicketActivityList,
    TicketActivityForm
  },
  computed: {
    ...mapGetters(["user", "ticket_activity_logs"]),
  },
  methods: {
    ...mapActions(['fetchTicketActivityLogs', 'fetchTickets', "openTicketActivityLogForm"]),
  },
  created() {
    if(this.user) {
      this.fetchTickets(this.user);
      this.fetchTicketActivityLogs(this.user);
    }
  }
}
</script>

<style>

</style>
