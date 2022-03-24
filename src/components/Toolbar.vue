<template>
  <v-card color="white" height="60px">
    <v-toolbar color="#5B943D">
      <v-btn class="ma-2" color="#F7DB5E" v-on:click="clickNA()">
        Register/Log In
        <v-icon dark right> mdi-account-plus </v-icon>
      </v-btn>

      <v-btn class="ma-2" v-if="!(this.idUsuario === '')" color="#F7DB5E" v-on:click="clickNR()">
        New Course
        <v-icon dark right> mdi-arm-flex </v-icon>
      </v-btn>

      <v-btn class="ma-2" v-if="!(this.idUsuario === '')" color="#F7DB5E"  v-on:click="clickNT()">
        New Reward
        <v-icon dark right> mdi-medal </v-icon>
      </v-btn>

      <v-spacer />
      <v-btn v-if="!(this.idUsuario === '')" v-on:click="clickMP()" color="#F7DB5E" >
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
  props:{
    idUsuario: { type: String, default: "" }
  },
  methods: {
    
  },
};
</script>
