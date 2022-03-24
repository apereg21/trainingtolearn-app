<template>
  <v-app id="keep" class="white">
    <v-card color="white" height="60px">
      <v-toolbar color="#5B943D">
        <v-btn v-if="(this.idUsuario === '')" class="ma-2" color="#F7DB5E" v-on:click="clickNA()">
          Register/Log In
          <v-icon dark right> mdi-account-plus </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!(this.idUsuario === '')"
          color="#F7DB5E"
          v-on:click="clickNR()"
        >
          New Course
          <v-icon dark right> mdi-arm-flex </v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          v-if="!(this.idUsuario === '')"
          color="#F7DB5E"
          v-on:click="clickNT()"
        >
          New Reward
          <v-icon dark right> mdi-medal </v-icon>
        </v-btn>

        <v-spacer />
        <v-btn
          v-if="!(this.idUsuario === '')"
          v-on:click="clickMP()"
          color="#F7DB5E"
        >
          <v-icon class="ma-2" left> mdi-account-circle </v-icon>
          My Profile
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
    idUsuario: { type: String, default: "" },
  },
  computed: {},
  methods: {
    clickNA: function () {
      this.$router.push({
        name: "UserRegistration",
        params: { idUsuario: this.idUsuario }
      });
    },
    clickNT: function () {
      this.$router.push({
        name: "TransactionCreation",
        params: { idUsuario: this.idUsuario }
      });
    },
    clickNR: function () {
      this.$router.push({
        name: "RewardCreation",
        params: { idUsuario: this.idUsuario }
      });
    },
    clickMP: function () {
      this.$router.push({
        name: "MyProfile",
        params: { idUsuario: this.idUsuario }
      });
    },
  },
};
</script>