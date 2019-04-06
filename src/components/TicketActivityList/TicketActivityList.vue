<template>
  <v-data-table
    :headers="headers"
    :items="this.ticket_activity_logs"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.attributes.activity }}</td>
      <td>{{ props.item.attributes.log_time }}</td>
      <td>{{ props.item.attributes.log_date }}</td>
      <td>{{ props.item.attributes.ticket_no }}</td>
      <td>{{ props.item.attributes.status }}</td>
      <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item.id)"
          >
            delete
          </v-icon>
        </td>
    </template>
  </v-data-table>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: 'TicketActivityList',
    props: ['ticket_activity_logs'],
    data () {
      return {
        headers: [
          { text: 'Activity', value: 'attributes.activity'},
          { text: 'Log Time', value: 'attributes.log_time' },
          { text: 'Log Date', value: 'attributes.log_date' },
          { text: 'Ticket No', value: 'attributes.ticket_no' },
          { text: 'Status', value: 'attributes.status' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
      }
    },
    methods: {
      ...mapActions(['deleteTicketActivityLog']),
      editItem (id) {
      },
      deleteItem (id) {
        confirm('Are you sure you want to delete this ticket?') && this.deleteTicketActivityLog(id)
      },

    }
  }
</script>