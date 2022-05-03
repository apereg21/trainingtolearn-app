<template>
  <v-card color="white" height="60px">
    <v-toolbar color="#5B943D">
      <v-btn
        class="ma-2"
        color="#F7DB5E"
        justify="end"
        v-on:click="goToMyProfile()"
      >
        <v-icon> mdi-arrow-left </v-icon>
        Go Back
      </v-btn>
      <v-spacer />
      <v-btn
        class="ma-2"
        color="#F7DB5E"
        align="right"
        justify="end"
        v-on:click="deleteAccount()"
      >
        <v-icon> mdi-account-off </v-icon>
        Delete Account
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
const axios = require("axios");
export default {
  data: () => ({}),
  methods: {
    goToMyProfile: function () {
      this.$router.push({
        name: "MyProfile",
      });
    },
    goToHome: function () {
      this.$router.push({
        name: "Home",
      });
    },
    deleteAccount: function () {
      var itsok = confirm("Are you sure of that?");
      if (itsok) {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const idToNumber = parseInt(this.$store.state.idUser);
        const postData = {
          id: idToNumber,
        };
        axios
          .post("http://localhost:3000/deleteUser", postData, { headers })
          .then((response) => {
            if (!response.data.includes("can't")) {
              this.$store.commit("SET_IDUSER", "");
              this.$store.commit("SET_ROLE", "");
              console.log("Server response: " + response.data);
              alert("Goodbye Mr/Mrs " + response.data);
              this.goToHome();
            } else {
              alert(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    },
  },
};
</script>
