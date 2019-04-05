<template>
  <v-flex sm12 xs12 class="text-sm-left text-xs-center"
  >
    <v-sheet >
      <full-calendar :events="events" ref="calendar" :config="config"></full-calendar>
    </v-sheet>
  </v-flex>
</template>

<script>
  import { isEmpty } from 'lodash';

  export default {
    name: 'Calander',
    props: ['tickets', 'ticket_activity_logs'],
    data () {
      return {
        config: {
          defaultView: 'month'
        }
      }
    },
    computed: {
      events() {
        const tickets = !isEmpty(this.tickets) && this.tickets.data.map(ticket => {
          return {
            title: ticket.attributes.title,
            start: ticket.attributes.start_date,
            end: ticket.attributes.end_date || ticket.attributes.start_date,
            color: '#87ceeb'
          }
        });

        const ticket_activity_logs = !isEmpty(this.ticket_activity_logs) && this.ticket_activity_logs.data.map(ticket_activity => {
          return {
            title: ticket_activity.attributes.activity,
            start: ticket_activity.attributes.log_date,
            end: ticket_activity.attributes.log_date,
          }
        });
        return !isEmpty(tickets) && tickets.concat(ticket_activity_logs)
      }
    },
    methods: {
    }
  }
</script>

<style>

</style>
