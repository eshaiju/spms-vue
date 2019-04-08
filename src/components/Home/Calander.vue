<template>
  <v-flex sm12 xs12 class="text-sm-left text-xs-center"
  >
    <v-sheet >
       <full-calendar 
        class="test-fc" 
        :events="events" 
        first-day='1' locale="en"
        @dayClick="dayClick"
        >
      </full-calendar>
    </v-sheet>
  </v-flex>
</template>

<script>
  import { isEmpty } from 'lodash';
  import { mapActions } from "vuex";
  import moment from 'moment';

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
          }
        });

        const ticket_activity_logs = !isEmpty(this.ticket_activity_logs) && this.ticket_activity_logs.data.map(ticket_activity => {
          return {
            title: ticket_activity.attributes.activity,
            start: ticket_activity.attributes.log_date,
            end: ticket_activity.attributes.log_date,
            cssClass: 'label-color'
          }
        });
        return !isEmpty(tickets) ? tickets.concat(ticket_activity_logs) : []
      }
    },
    methods: {
      ...mapActions(["openTicketActivityLogForm", "addTicketActivityLog"]),
      'dayClick' (day, jsEvent) {
        this.addTicketActivityLog({ 
          data: {
            id: null,
            attributes: {
              log_date: moment(day).format('YYYY-MM-DD')
            }
          }
        })
        this.openTicketActivityLogForm();
        console.log('dayClick', day, jsEvent)
      }
    }
  }
</script>

<style>
  .comp-full-calendar {
    max-width: 100% !important;
  }
  .label-color {
    background: blue !important;
  }
</style>
