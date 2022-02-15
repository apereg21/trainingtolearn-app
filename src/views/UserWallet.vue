<template>
  <v-app id="keep" class="white">
    <ToolbarSpecialPW />
    <v-card class="justify-center mx-auto my-5" width="1000" height="800">
      <v-toolbar color="#DAF7A6">
        <v-toolbar-title >
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
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Password User"
          v-model="password"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-row>
          <v-col align="center" justify="center">
            <v-btn color="#A4BB7A" v-on:click="getUserID()">Load Data</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-text-field
          v-model="money"
          label="Amount of Points"
          align-left
          disabled
          outlined
          readonly
        ></v-text-field>
      </v-container>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="unirewards"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>
          <v-col>
            <v-data-table
              :headers="headers2"
              :items="transactions"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>
<style scoped>
::v-deep .v-data-table-header {
  background-color: #DAF7A6;
}
</style>
<script>
import ToolbarSpecialPW from "@/components/ToolbarSpecialPW";
const axios = require("axios");
export default {
  name: "UserWallet",
  data: () => ({
    unirewards: [],
    transactions: [],
    money: 0,
    show: false,
    headers: [
      { text: "Name", value: "nameUR", class:"#DAF7A6" },
      { text: "Desc", value: "descriptionUR", class:"#DAF7A6" },
      { text: "Cost", value: "cost", class:"#DAF7A6" },
    ],
    headers2: [
      { text: "Type", value: "typeTransaction", color:"#DAF7A6" },
      { text: "Money", value: "money", color:"#DAF7A6" },
      { text: "UniRewardId", value: "UniRewardId", color:"#DAF7A6" },
      { text: "From Address", value: "fromAddress", color:"#DAF7A6" },
      { text: "To Address", value: "toAddress", color:"#DAF7A6" },
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
          this.money = response.data[0].money.length;
          if (response.data.length > 2) {
            this.unirewards = response.data[1];
            this.transactions = response.data[2];
          } else {
            this.transactions = response.data[1];
          }
          alert(response.data);
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