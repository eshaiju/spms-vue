<template>
  <v-app id="inspire">
    <v-content>
      <v-progress-linear :indeterminate="true" v-if="loaderStatus"></v-progress-linear>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'App',
  computed: mapGetters(['loaderStatus'])
}
</script>