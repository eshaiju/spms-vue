<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <form action="#" @submit.prevent="loginHandler">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="true" type="error" v-if="loginError">{{loginError}}</v-alert>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Login"
                type="text"
                v-model="email"
                v-validate="'required|email'"
              ></v-text-field>
              <i v-show="submitted && errors.has('email')" class="fa fa-warning"></i>
              <span v-show="submitted && errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                v-validate="'required'"
              ></v-text-field>
               <i v-show="submitted && errors.has('password')" class="fa fa-warning"></i>
              <span v-show="submitted && errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit">Login</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: mapGetters(["loginError"]),
  methods: {
    ...mapActions(['login']),
    loginHandler(e) {
      this.submitted = true;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.login({
            email: this.email,
            password: this.password
          });
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
  .v-btn {
    width: 100%;
    margin-bottom: 10px;
  }
</style>