<template>
  <v-app id="inspire">
    <v-content>
      <Header />
      <v-progress-linear :indeterminate="true" v-if="loaderStatus"></v-progress-linear>
      <v-container fluid>
        <router-view />
      </v-container>
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Header from './components/Shared/Header'
import Footer from './components/Shared/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed: mapGetters(['loaderStatus'])
}
</script>

<style >
  .container {
    min-height: 500px;
  }
</style>
