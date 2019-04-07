<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click.stop="openTicketActivityLogForm()"
    >
      Create New Activity
    </v-btn>
    <v-dialog v-model="ticketActivityLogForm" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <form action="#" @submit.prevent="save">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Activity"
                    name="activity"
                    v-validate="'required'"
                    v-model="ticketActivityLog.data.attributes.activity"
                  ></v-text-field>
                  <i v-show="submitted && errors.has('activity')" class="fa fa-warning"></i>
                  <span v-show="submitted && errors.has('activity')" class="help is-danger">{{ errors.first('activity') }}</span>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="items"
                    name="ticket_id"
                    v-validate="'required'"
                    v-model="ticketActivityLog.data.attributes.ticket_id"
                    label="Select a ticket"
                  ></v-select>
                  <i v-show="submitted && errors.has('ticket_id')" class="fa fa-warning"></i>
                  <span v-show="submitted && errors.has('ticket_id')" class="help is-danger">{{ errors.first('ticket_id') }}</span>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="ticketActivityLog.data.attributes.log_date"
                        label="Log Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        name="log_date"
                        v-validate="'required'"
                      ></v-text-field>
                      <i v-show="submitted && errors.has('log_date')" class="fa fa-warning"></i>
                      <span v-show="submitted && errors.has('log_date')" class="help is-danger">{{ errors.first('log_date') }}</span>
                    </template>
                    <v-date-picker v-model="ticketActivityLog.data.attributes.log_date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                  label="Log Time"
                  v-validate="'required|numeric'"
                  name="log_time"
                  v-model="ticketActivityLog.data.attributes.log_time"></v-text-field>
                  <i v-show="submitted && errors.has('log_time')" class="fa fa-warning"></i>
                  <span v-show="submitted && errors.has('log_time')" class="help is-danger">{{ errors.first('log_time') }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" type='submit'>Save</v-btn>
            <v-btn color="error" @click="close">Cancel</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { isEmpty } from 'lodash'

export default {
  data() {
    return{
      dialog: false,
      menu2: false,
      submitted: false,
      ticketActivityLog: {
        data: {
          id: null,
          attributes: {
            activity: ''
          }
        },
      },
    }
  },
  computed: {
    ...mapGetters(["user", "tickets", "ticket_activity_log", "ticketActivityLogForm"]),
    formTitle() {
      return this.ticketActivityLog.data.id === null ? 'Create New Activity' : 'Edit Activity'
    },
    items() {
      if(isEmpty(this.tickets)) return([]);
      return this.tickets.data.map(ticket => {
        return { text: ticket.attributes.ticket_no, value: parseInt(ticket.id, 10)}
      })
    }
  },
  watch: {
    ticket_activity_log (val) {
      this.ticketActivityLog = this.ticket_activity_log;
    }
  },
  methods: {
    ...mapActions(['saveTicketActivity', 'updateTicketActivity', 'closeTicketActivityLogForm', "openTicketActivityLogForm"]),
    close() {
      this.closeTicketActivityLogForm(),
      this.submitted = false,
      this.ticketActivityLog = {
        data: {
          id: null,
          attributes: {
            activity: ''
          }
        },
      }
    },
    save() {
      this.submitted = true;
      this.$validator.validateAll().then((result) => {
        if (result) {
          const ticketActivityInput = {
            ...this.ticketActivityLog.data.attributes,
            user_id: this.user.data.id
          }
          if(isEmpty(ticketActivityInput.id)){
            this.saveTicketActivity(ticketActivityInput)
          } else {
            this.updateTicketActivity(ticketActivityInput, ticketActivityInput.id)
          } 
          this.close();
        }
      });
    }
  }
}
</script>

<style scoped>
  .v-card__title, .v-card__actions{
    background-color: #00b5ad;
    color: white;
  }
</style>