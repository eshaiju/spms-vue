import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import loader from './modules/loader'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loader,
    login
  }
})
