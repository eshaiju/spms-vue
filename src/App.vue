<template>
  <v-app id="inspire">
    <v-content>
      <Header />
      <v-progress-linear :indeterminate="true" v-if="loaderStatus"></v-progress-linear>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: mapGetters(['loaderStatus'])
}
</script>