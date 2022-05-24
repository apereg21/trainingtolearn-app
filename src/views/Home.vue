<template>
  <v-app id="keep" class="white">
    <v-card color="white" height="60px">
      <v-toolbar color="#5B943D">
        <v-btn
          v-if="isUser === ''"
          class="ma-2"
          color="#F7DB5E"
          v-on:click="clickNA()"
        >
          Register/Log In
          <v-icon dark right> mdi-account-plus </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!(isUser === '') && !(typeUs === 'N')"
          color="#F7DB5E"
          v-on:click="clickNR()"
        >
          New Course
          <v-icon dark right> mdi-arm-flex </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!(isUser === '') && !(typeUs === 'N')"
          color="#F7DB5E"
          v-on:click="clickNT()"
        >
          UniPoints Delivery
          <v-icon dark right> mdi-medal </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!(isUser === '')"
          color="#F7DB5E"
          v-on:click="clickSC()"
        >
          Course Status
          <v-icon dark right> mdi-file-document-edit-outline </v-icon>
        </v-btn>

        <v-spacer />

        <v-btn
          class="ma-2"
          v-if="!(isUser === '')"
          color="#F7DB5E"
          v-on:click="logout()"
        >
          Logout
          <v-icon dark right> mdi-account-minus </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!(isUser === '')"
          v-on:click="clickMP()"
          color="#F7DB5E"
        >
          My Profile
          <v-icon dark right> mdi-account-circle </v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
const axios = require("axios");
export default {
  name: "Home",
  data: () => ({}),
  props: {},
  computed: {
    isUser() {
      return this.$store.state.idUser;
    },
    typeUs() {
      return this.$store.state.roleUser;
    },
  },
  methods: {
    clickNA: function () {
      this.$router.push({
        name: "UserRegistration",
      });
    },
    clickNT: function () {
      this.$router.push({
        name: "RewardUP",
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
    clickSC: function () {
      this.$router.push({
        name: "SmartContractState",
      });
    },
    logout: function () {
      
      if (confirm("Are you sure you want to logout?")) {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        axios
          .get(
            "http://localhost:3000/getUsersName/:" + this.$store.state.idUser,
            { headers }
          )
          .then((response) => {
            alert("Goodbye Mr/Mrs " + response.data);
            this.$store.commit("SET_IDUSER", "");
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    },
  },
  mounted: function () {},
};
</script>