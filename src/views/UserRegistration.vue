<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-alert :type="typeAlert" v-if="alert" dimissable>{{ textAlert }}</v-alert>
    <v-row align="center">
      <v-col align="center">
        <v-card class="justify-center mx-auto my-5" width="800" height="300">
          <v-toolbar color="#5B943D">
            <v-toolbar-title> User Form </v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row no-gutters>
                <v-text-field
                  v-model="username"
                  :rules="bodyRules"
                  label="Username"
                  required
                  @keyup.enter="loginUser()"
                ></v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  label="Password"
                  v-model="password"
                  class="input-group--focused"
                  required
                  @click:append="show = !show"
                  @keyup.enter="loginUser()"
                ></v-text-field>
              </v-row>
              <v-row> </v-row>
              <v-row>
                <v-col align="center" justify="center">
                  <v-btn
                    :disabled="!valid"
                    color="green"
                    class="mr-3"
                    v-on:click="loginUser()"
                  >
                    Log in
                  </v-btn>

                  <v-btn
                    color="#0098D6"
                    class="mr-0"
                    v-on:click="goToRegistration()"
                  >
                    Register
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
import Footer from "@/components/Footer";
const axios = require("axios");
export default {
  name: "UserRegistration",
  data: () => ({
    valid: true,
    show: false,
    username: "",
    password: "",
    alert: false,
    typeAlert: "",
    textAlert: "",
    bodyRules: [
      (v) => !!v || "Data field is required",
      (v) => (v && v.length >= 3) || "Name must be less than 3 characters",
    ],
  }),
  components: {
    ToolbarSpecial,
    Footer,
  },
  computed: {},

  methods: {
    goToRegistration: function () {
      this.$router.push({
        name: "UserCreation",
      });
    },
    goToHome: function () {
      setTimeout(() => {
        this.$router.push({
          name: "Home",
        });
      }, 950);
    },
    loginUser() {
      this.alert = false;
      if (this.$refs.form.validate() == true) {
        var postData = {
          username: this.username,
          password: this.password,
        };

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        axios
          .post("http://localhost:3000/loginUser", postData, { headers })
          .then((response) => {
            if (!isNaN(response.data)) {
              this.$store.commit("SET_IDUSER", response.data);
              this.$store.commit("SET_PASSWORD", this.password);
              axios
                .get(
                  "http://localhost:3000/getUserRole/:" +
                    this.$store.state.idUser,
                  { headers }
                )
                .then((response2) => {
                  var username = this.username;
                  var typUser = response2.data;
                  this.textAlert = "Welcome to the platform Mr/Mrs " + username;
                  this.typeAlert = "success";
                  this.alert = true;
                  this.$store.commit("SET_ROLE", typUser);
                  this.goToHome();
                })
                .catch((error) => {
                  console.log(error);
                  alert(error);
                });
            } else {
              this.textAlert = response.data;
              this.typeAlert = "error";
              this.alert = true;
            }
          })
          .catch((error) => {
            this.textAlert = error;
            this.typeAlert = "error";
            this.alert = true;
          });
      } else {
        this.textAlert = "You need to fill all the fields";
        this.typeAlert = "warning";
        this.alert = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>