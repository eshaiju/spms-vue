<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <form action="#" @submit.prevent="login">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="true" type="error" v-if="loginError">{{loginError}}</v-alert>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
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
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: mapGetters(["loginError"]),
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>