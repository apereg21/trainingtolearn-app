<template>
  <v-app id="keep" class="white">
    <ToolbarSpecialPW />
    <v-card class="justify-center mx-auto my-5" width="1000" height="800">
      <v-toolbar color="#5B943D">
        <v-toolbar-title >
          My Profile
        </v-toolbar-title>
      </v-toolbar>
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
  background-color: #5B943D;
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
      { text: "Name of UniReward", value: "nameUR", class:"#5B943D" },
      { text: "Description of UniReward", value: "descriptionUR", class:"#5B943D" },
      { text: "Cost (UniPoints)", value: "cost", class:"#5B943D" },
    ],
    headers2: [
      { text: "Type Operation", value: "typeTransaction", color:"#5B943D" },
      { text: "Points", value: "money", color:"#5B943D" },
      { text: "Name of UniReward", value: "UniRewardId", color:"#5B943D" },
      { text: "From", value: "fromAddress", color:"#5B943D" },
      { text: "To", value: "toAddress", color:"#5B943D" },
    ],
  }),
  props: {},
  components: {
    ToolbarSpecialPW,
  },
  computed: {},
  mounted:function(){
    this.getUserWalletData()
  },
  methods: {
    getUserWalletData() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getSpecificWallet/:" + this.$store.state.idUser, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.money = response.data[0].money.length;
          if (response.data.length > 2) {
            this.unirewards = response.data[1];
            this.transactions = response.data[2];
          } else {
            this.transactions = response.data[1];
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  }
};
</script>