<template>
  <div>
    <h2>Tickets</h2><br/>
    <TicketList :tickets="tickets.data" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TicketList from '../components/Tickets/TicketList';

export default {
  name: "Tickets",
  components: {
    TicketList
  },
  computed: {
    ...mapGetters(["user", "tickets"])
  },
  methods: {
    ...mapActions(['fetchTickets'])
  },
  created() {
    if(this.user) {
      this.fetchTickets(this.user);
    }
  }
}
</script>

<style>

</style>
