<template>
  <v-app id="keep" class="white">
    <ToolbarSpecialPW />
    <v-card class="justify-center mx-auto my-5" width="800" height="700">
      <v-toolbar dark color="blue">
        <v-toolbar-title class="text-h6 white--text pl-0">
          My Profile
        </v-toolbar-title>
      </v-toolbar>
      <v-container fuild>
        <v-text-field
          v-model="username"
          label="username"
          align-left
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          align-left
        ></v-text-field>
        <v-btn v-on:click="getUserID()">Hey</v-btn>
      </v-container>
      <v-container fuild>
        <v-text-field v-model="name" disabled> </v-text-field>
        <v-text-field v-model="fullsurname" disabled> </v-text-field>
        <v-text-field v-model="usname" disabled> </v-text-field>
        <v-text-field v-model="uspass" disabled> </v-text-field>
        <v-text-field v-model="typeuser" disabled> </v-text-field>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecialPW from "@/components/ToolbarSpecialPW";
const axios = require("axios");
export default {
  name: "UserProfile",
  data: () => ({
    id: "",
    userData: [],
    username: "",
    password: "",
    name: "",
    uspass: "",
    fullsurname: "",
    usname: "",
    typeuser:""
  }),
  props: {},
  components: {
    ToolbarSpecialPW,
  },
  computed: {},

  methods: {
    getUserData(id) {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getSpecificUser/:" + id, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.name = response.data.name;
          this.uspass = response.data.password;
          this.fullsurname = response.data.fullSurname;
          this.usname = response.data.username;
          this.typeuser = response.data.typeUser;
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    getUserID() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/getSpecificUserID/", data, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.getUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  },
};
</script>