<template>
  <div>
    <h2>Tickets</h2><br/>
    <v-btn
      color="primary"
      dark
      @click.stop="openTicketForm()"
    >
      Create New Ticket
    </v-btn>
    <TicketForm />
    <TicketList :tickets="tickets.data" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TicketList from '../components/Tickets/TicketList';
import TicketForm from '../components/Tickets/TicketForm';

export default {
  name: "Tickets",
  components: {
    TicketList,
    TicketForm
  },
  computed: {
    ...mapGetters(["user", "tickets"])
  },
  methods: {
    ...mapActions(['fetchTickets', 'openTicketForm'])
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
