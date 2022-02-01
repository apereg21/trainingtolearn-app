<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="800" height="600">
      <v-toolbar dark color="blue">
        <v-toolbar-title class="text-h6 white--text pl-0">
          User Form
        </v-toolbar-title>
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
                color="success"
                class="mr-3"
                v-on:click="createAccount()"
              >
                Create User
              </v-btn>

              <v-btn color="warning" class="mr-0" @click="reset">
                Reset Data
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
const axios = require("axios");
export default {
  name: "UserCreation",
  data: () => ({
    valid: true,
    show:false,
    select:"",  
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
  },
  computed: {},

  methods: {
    createAccount() {
      if(this.$refs.form.validate()==true){
        var postData = {
        name: this.name,
        fullSurname: this.fullSurname,
        username: this.username,
        password: this.password,
        roleUser: this.select.charAt(0)
      };
      
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .post("http://localhost:3000/createNewUser", postData, {headers})
        .then((response) => {
          console.log("Server response: " + response.data);
          alert(response.data)
        })
        .catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>