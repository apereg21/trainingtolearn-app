<template>
  <v-app id="keep" class="white">
    <v-card color="white" height="60px">
      <v-toolbar color="#5B943D">
        <v-btn v-if="(isUser === '')" class="ma-2" color="#F7DB5E" v-on:click="clickNA()">
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
          v-if="!(isUser === '')"
          color="#F7DB5E"
          v-on:click="clickNT()"
        >
          New Reward
          <v-icon dark right> mdi-medal </v-icon>
        </v-btn>

        <v-spacer />

        <v-btn
          class="ma-2"
          v-if="!(isUser === '')"
          color="#F7DB5E"
          v-on:click="refresh()"
        >
          Logout
          <v-icon dark right> mdi-account-minus </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!( isUser === '')"
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
export default {
  name: "Home",
  data: () => ({}),
  props: {
  },
  computed: {
    isUser(){
      return this.$store.state.idUser
    },
    typeUs(){
      return this.$store.state.roleUser
    }
  },
  methods: {
    clickNA: function () {
      this.$router.push({
        name: "UserRegistration",
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
    refresh: function(){
        this.$store.commit("SET_IDUSER","")
        this.$router.push({
        name: "Home",
      });
    }
  },
  mounted: function(){
  }
};
</script>