<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout row wrap>
      <DashboardStatistics 
        v-bind:statstics="statstics"
      />
    </v-layout>
    <v-layout row wrap>
      <Calander 
        v-bind:tickets='tickets'
        v-bind:ticket_activity_logs='ticket_activity_logs' />
    </v-layout>
  </v-container>
</template>

<script>
  import Calander from '../components/Home/Calander';
  import DashboardStatistics from '../components/Home/DashboardStatistics';

  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "home",
    components: {
      Calander,
      DashboardStatistics
    },
    computed: {
      ...mapGetters(['statstics', 'tickets', 'ticket_activity_logs'])
    },
    methods: {
      ...mapActions(['fetchDashboardData']),
    },
    created() {
      this.fetchDashboardData();
    }
  }
</script>
content_copy

