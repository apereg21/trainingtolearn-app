<template>
  <v-app id="keep" class="white">
    <ToolbarSpecialPW />
    <v-card class="justify-center mx-auto my-5" width="800" height="625">
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
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="unirewards"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-container>
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecialPW from "@/components/ToolbarSpecialPW";
const axios = require("axios");
export default {
  name: "UserWallet",
  data: () => ({
    unirewards: [],
    transactions: [],
    headers: [
      { text: "Money", value: "money" },
    ],
  }),
  props: {},
  components: {
    ToolbarSpecialPW,
  },
  computed: {},

   methods: {
    getUserWalletData(id) {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getSpecificWallet/:" + id, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.money = response.data.fullSurname;
          this.ids = response.data.username;
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
          this.getUserWalletData(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  },
};
</script>