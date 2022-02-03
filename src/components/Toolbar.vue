<template>
<v-card
    color="white"
    height="60px"
  >
  <v-toolbar color="blue">
    <v-btn class="ma-2" color="primary" dark v-on:click="clickNA()">
      New Account
      <v-icon dark right> mdi-account-plus </v-icon>
    </v-btn>

    <v-btn class="ma-2" color="red" dark v-on:click="clickNT()">
      New Payment/Adquisition
      <v-icon dark right> mdi-currency-usd </v-icon>
    </v-btn>

    <v-btn class="ma-2" color="black" dark v-on:click="clickNR()">
      New Course
      <v-icon dark right> mdi-medal </v-icon>
    </v-btn>
  </v-toolbar>
</v-card>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    clickNA: function () {
      this.$router.push({
        name: "UserCreation",
      });
      
    },
    clickNT: function () {
       this.$router.push({
        name: "TransactionCreation",
      });
    },
    clickNR: function () {
      this.$router.push({
        name: "RewardCreation",
      });
    }
  },
};
</script>
