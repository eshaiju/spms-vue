<template>
  <div>
    <h2>Ticket Activities</h2><br/>
    <TicketActivityList :ticket_activity_logs="ticket_activity_logs.data" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TicketActivityList from '../components/TicketActivityList/TicketActivityList';

export default {
  name: "TicketActivityLogs",
  components: {
    TicketActivityList
  },
  computed: {
    ...mapGetters(["user", "ticket_activity_logs"])
  },
  methods: {
    ...mapActions(['fetchTicketActivityLogs'])
  },
  created() {
    if(this.user) {
      this.fetchTicketActivityLogs(this.user);
    }
  }
}
</script>

<style>

</style>
