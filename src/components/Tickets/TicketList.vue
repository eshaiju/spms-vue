<template>
  <v-data-table
    :headers="headers"
    :items="this.tickets"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.attributes.ticket_no }}</td>
      <td>{{ props.item.attributes.title }}</td>
      <td>{{ props.item.attributes.project.data.attributes.name }}</td>
      <td>{{ props.item.attributes.category }}</td>
      <td>{{ props.item.attributes.status }}</td>
      <td>{{ props.item.attributes.start_date }}</td>
      <td>{{ props.item.attributes.end_date }}</td>
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
  export default {
    name: 'TicketList',
    props: ['tickets'],
    data () {
      return {
        headers: [
          { text: 'Ticket ID', value: 'attributes.ticket_no'},
          { text: 'Title', value: 'attributes.title' },
          { text: 'Project', value: 'attributes.project.data.attributes.name' },
          { text: 'Category', value: 'attributes.category' },
          { text: 'Status', value: 'attributes.status' },
          { text: 'Start Date', value: 'attributes.start_date' },
          { text: 'End Date', value: 'attributes.end_date' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
      }
    },
    methods: {
      editItem (id) {
      },
      deleteItem (id) {
        confirm('Are you sure you want to delete this item?')
      },

    }
  }
</script>