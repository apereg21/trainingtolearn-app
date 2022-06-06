<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-alert :type="typeAlert" v-if="alert" dimissable>{{ textAlert }}</v-alert>
    <v-row align="center">
      <v-col align="center">
        <v-card class="justify-center mx-auto my-5" width="600" height="auto">
          <v-toolbar color="#5B943D">
            <v-toolbar-title> User Form </v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row no-gutters>
                <v-text-field
                  v-model="name"
                  :rules="bodyRules"
                  label="Name"
                  required
                  align-center
                ></v-text-field>
              </v-row>

              <v-row no-gutters>
                <v-text-field
                  v-model="fullSurname"
                  :rules="bodyRules"
                  label="Full Surname"
                  required
                ></v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-text-field
                  v-model="username"
                  :rules="bodyRules"
                  label="Username"
                  required
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
                ></v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-select
                  v-model="select"
                  :items="roles"
                  :rules="[(v) => !!v || 'Role is required']"
                  label="Roles"
                  required
                ></v-select>
              </v-row>
              <v-row> </v-row>
              <v-row>
                <v-col align="center" justify="center">
                  <v-btn
                    :disabled="!valid"
                    color="green"
                    class="mr-3"
                    v-on:click="createAccount()"
                  >
                    Create User
                  </v-btn>

                  <v-btn color="#FF9300" class="mr-0" @click="reset">
                    Reset Data
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
  name: "UserCreation",
  data: () => ({
    alert: false,
    typeAlert: "",
    textAlert: "",
    valid: true,
    show: false,
    select: "",
    name: "",
    fullSurname: "",
    username: "",
    password: "",
    bodyRules: [
      (v) => !!v || "Data field is required",
      (v) => (v && v.length >= 3) || "Name must be less than 3 characters",
    ],
    roles: ["Instructor", "Normal User"],
  }),
  props: {},
  components: {
    ToolbarSpecial,
    Footer,
  },
  computed: {},

  methods: {
    createAccount() {
      if (this.$refs.form.validate() == true) {
        var postData = {
          name: this.name,
          fullSurname: this.fullSurname,
          username: this.username,
          password: this.password,
          typeUser: this.select.charAt(0),
        };

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        axios
          .post("http://localhost:3000/createNewUser", postData, { headers })
          .then((response) => {
            this.alert = false;
            console.log("Server response: " + response.data);
            this.textAlert = response.data;
            if (response.data == "OK - Acount created") {
              this.typeAlert = "success";
              this.alert = true;
              this.goLogin();
            } else {
              this.typeAlert = "error";
              this.alert = true;
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      } else {
        this.textAlert = "You need to fill all the fields";
        this.typeAlert = "warning";
        this.alert = true;
      }
    },
    goLogin() {
      setTimeout(() => {
        this.$router.push({
          name: "UserRegistration",
        });
      }, 950);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>