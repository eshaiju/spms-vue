<template>
  <v-layout row wrap>
    <v-flex lg3 md3 sm12 xs12>
      <v-card>
        <v-card-title>
          <h3>Total Hours</h3>
        </v-card-title>
        <v-card-text>
          {{statstics && statstics.total_hours_in_current_month}} <br/>
          Total number of hours logged in current month
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex lg3 md3 sm12 xs12>
      <v-card>
        <v-card-title>
          <h3>Total Activities</h3>
        </v-card-title>
        <v-card-text>
          {{statstics && statstics.total_activities_of_current_month}} <br/>
          Total number of activities recorded in current month
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex lg3 md3 sm12 xs12>
      <v-card>
        <v-card-title>
          <h3>Total Tickets</h3>
        </v-card-title>
        <v-card-text>
          {{statstics && statstics.total_tickets_of_current_month}} <br/>
          Total number of tickets assigned in current month
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex lg3 md3 sm12 xs12>
      <v-card>
        <v-card-title>
          <h3>Last Months Hours</h3>
        </v-card-title>
        <v-card-text>
          {{statstics && statstics.total_hours_in_previous_month}} <br/>
          Total number of hours logged in previous month
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'DashboardStatistics',
  props: ['statstics']
}
</script>

<style scopped>
  .v-card__title{
    background-color: #00b5ad;
    color: white;
    text-align: center;
    display: block;
  }
  .v-card__text {
    height: 95px;
  }
  .layout {
    padding-bottom: 20px;
  }
</style>
