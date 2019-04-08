<template>
  <div>
    <v-dialog v-model="ticketForm" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <form action="#" @submit.prevent="save">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    label="Ticket No"
                    name="ticket_no"
                    v-validate="'required'"
                    v-model="ticketObject.data.attributes.ticket_no"
                  ></v-text-field>
                  <span v-show="submitted && errors.has('ticket_no')" class="help is-danger">{{ errors.first('ticket_no') }}</span>
                </v-flex>
                <v-flex xs12 sm8 md8>
                  <v-text-field
                    label="Title"
                    name="title"
                    v-validate="'required'"
                    v-model="ticketObject.data.attributes.title"
                  ></v-text-field>
                  <span v-show="submitted && errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Description"
                    name="description"
                    v-model="ticketObject.data.attributes.description"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-select
                    :items="projectList"
                    name="project_id"
                    v-validate="'required'"
                    v-model="ticketObject.data.attributes.project_id"
                    label="Select a project"
                  ></v-select>
                  <span v-show="submitted && errors.has('project_id')" class="help is-danger">{{ errors.first('project_id') }}</span>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    :items="categoryList"
                    name="category"
                    v-model="ticketObject.data.attributes.category"
                    label="Select a category"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    :items="statusList"
                    name="status"
                    v-model="ticketObject.data.attributes.status"
                    label="Select a status"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    label="Maximum Permitted Time"
                    name="maximum_permitted_time"
                    v-validate="'numeric'"
                    v-model="ticketObject.data.attributes.maximum_permitted_time"
                  ></v-text-field>
                  <span v-show="submitted && errors.has('maximum_permitted_time')" class="help is-danger">{{ errors.first('maximum_permitted_time') }}</span>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-menu
                    v-model="startDatePicker"
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
                        v-model="ticketObject.data.attributes.start_date"
                        label="Start Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        name="start_date"
                        v-validate="'required'"
                      ></v-text-field>
                      <i v-show="submitted && errors.has('start_date')" class="fa fa-warning"></i>
                      <span v-show="submitted && errors.has('start_date')" class="help is-danger">{{ errors.first('start_date') }}</span>
                    </template>
                    <v-date-picker v-model="ticketObject.data.attributes.start_date" @input="startDatePicker = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-menu
                    v-model="endDatePicker"
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
                        v-model="ticketObject.data.attributes.end_date"
                        label="End Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        name="end_date"
                        v-validate="'required'"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="ticketObject.data.attributes.end_date" @input="endDatePicker = false"></v-date-picker>
                  </v-menu>
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
import { isEmpty } from 'lodash';
import { TICKET_CATEGORIES, TICKET_STATUS } from '../../constants';

export default {
  data() {
    return{
      dialog: false,
      startDatePicker: false,
      endDatePicker: false,
      submitted: false,
      categoryList: TICKET_CATEGORIES,
      statusList: TICKET_STATUS,
      ticketObject: {
        data: {
          id: null,
          attributes: {
          }
        },
      },
    }
  },
  computed: {
    ...mapGetters(["user", "ticket", "ticketForm"]),
    formTitle() {
      return this.ticket.data.id === null ? 'Create New Ticket' : 'Edit Ticket'
    },
    projectList() {
      if(isEmpty(this.user)) return([]);

      const projects = this.user.data.attributes.projects
      return projects.data.map(project => {
        return { text: project.attributes.name, value: parseInt(project.id, 10)}
      })
    }
  },
  watch: {
    ticket (val) {
      this.ticketObject = this.ticket;
    }
  },
  methods: {
    ...mapActions(['saveTicket', 'updateTicket', 'closeTicketForm', "openTicketForm"]),
    close() {
      this.closeTicketForm(),
      this.submitted = false,
      this.ticketObject = {
        data: {
          id: null,
          attributes: {
          }
        },
      }
    },
    save() {
      this.submitted = true;
      this.$validator.validateAll().then((result) => {
        if (result) {
          const ticketInput = {
            ...this.ticketObject.data.attributes,
            assigned_user_id: this.user.data.id,
            created_user_id: this.user.data.id,
            created_user_type: 'User',
            id: this.ticketObject.data.id
          }
           delete ticketInput.project
           delete ticketInput.assigned_user

          if(isEmpty(ticketInput.id)){
            this.saveTicket(ticketInput)
          } else {
            this.updateTicket(ticketInput)
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