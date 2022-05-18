<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="1200" height="450">
      <v-toolbar color="#5B943D">
        <v-toolbar-title> State of Courses </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-spacer/>
        <v-data-table
              :headers="headers"
              :items="sContracts"
              :items-per-page="5"
              class="elevation-1"
        ></v-data-table>
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
import ToolbarSpecial from "@/components/ToolbarSpecial";
const axios = require("axios");
export default {
  name: "SmartcontractState",
  data: () => ({
    sContracts:[],
    headers: [
      { text: "Name of UniReward", value: "nameUR"},
      { text: "Description of UniReward", value: "descriptionUR"},
      { text: "Cost (UniPoints)", value: "condition.length" },
      { text: "Progress (UniPoints)", value: "uniPointLess"},
      { text: "Complete?", value: "complete"},
    ],
  }),
  props: {},
  components: {
    ToolbarSpecial,
  },
  computed: {
    
  },
  methods: {
    getAllSmartContracts(){
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getAllSmartContractsUser/:" + this.$store.state.idUser, { headers })
        .then((response) => {
          console.log("Server response a this petition: " + response.data);
          console.log(response.data[0].walletIdDemander)
          this.sContracts=response.data
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  },
  mounted() {
    this.getAllSmartContracts()
  },
};
</script>