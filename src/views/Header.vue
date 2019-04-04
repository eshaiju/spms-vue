<template>
  <v-toolbar color="primary">
    <v-toolbar-items>
      <v-btn
        flat @click="('/')"
          tag='span'
          style='cursor: pointer'
          >
        SPMS
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-items class='hidden-xs-only' v-if="loggedIn">
      <v-btn
        flat @click="logout"
        >
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
    ...mapGetters(['loggedIn'])
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

