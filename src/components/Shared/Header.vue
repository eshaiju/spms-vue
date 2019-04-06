<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon class="hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-items>
      <v-btn
        flat @click="('/')"
          tag='span'
          style='cursor: pointer'
          >
        SPMS
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down" v-if="loggedIn">
      <v-btn flat to="/">Dashboard</v-btn>
      <v-btn flat to="/tickets">Tickets</v-btn>
      <v-btn flat to="/activity_logs">Activity Logs</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-items class='hidden-xs-only' v-if="loggedIn">
      <v-btn flat to="/profile">Profile</v-btn>
      <v-btn flat>Logged in as {{ fullName }}</v-btn>
      <v-btn flat @click="logout">
        <v-icon right>delete_sweep</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import localStore from "store";

export default {
  computed: {
    ...mapGetters(['loggedIn', 'user']),
    fullName() {
      return this.user && `${this.user.data.attributes.first_name} ${this.user.data.attributes.last_name}`
    }
  },
  methods: {
    ...mapActions(['signOutUser']),
    logout () {
      localStore.remove('jwt');
      this.signOutUser();
      this.$router.push({ name: "login" });
    }
  }
}
</script>

