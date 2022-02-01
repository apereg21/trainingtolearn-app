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
      New Transfer
      <v-icon dark right> mdi-currency-usd </v-icon>
    </v-btn>

    <v-btn class="ma-2" color="black" dark v-on:click="clickNR()">
      New Reward
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
      alert('You select create a new account!')
      this.$router.push({
        name: "UserCreation",
      });
      
    },
    clickNT: function () {
      alert('You select do a new transfer!')
       this.$router.push({
        name: "TransactionCreation",
      });
    },
    clickNR: function () {
      alert('You select create a new reward!')
      this.$router.push({
        name: "RewardCreation",
      });
    },
  },
};
</script>
