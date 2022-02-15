<template>
  <v-card color="white" height="60px">
    <v-toolbar color="#DAF7A6">
      <v-btn class="ma-2" color="#A4BB7A" v-on:click="clickNA()">
        New Account
        <v-icon dark right> mdi-account-plus </v-icon>
      </v-btn>

      <v-btn class="ma-2" color="#A4BB7A"  v-on:click="clickNT()">
        New Reward
        <v-icon dark right> mdi-medal </v-icon>
      </v-btn>

      <v-btn class="ma-2" color="#A4BB7A" v-on:click="clickNR()">
        New Course
        <v-icon dark right> mdi-arm-flex </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn v-on:click="clickMP()" color="#A4BB7A" >
        <v-icon class="ma-2" left>
          mdi-account-circle
        </v-icon>
        My Profile
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
    },
    clickMP: function () {
      this.$router.push({
        name: "MyProfile",
      });
    },
  },
};
</script>
