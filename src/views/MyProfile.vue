<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
<v-card class="justify-center mx-auto my-5" width="800" height="625">
      <v-toolbar color="#5B943D">
        <v-toolbar-title>
          My Profile
        </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-container grid-list-md/>
        <v-container grid-list-md/>
        <v-container grid-list-md/>
        <v-container grid-list-md/>
        <v-container grid-list-md/>
        <v-container grid-list-md/>
        <v-container grid-list-md/>
        <v-row no-gutters align="center" justify="center">
          <v-btn color="#F7DB5E" v-on:click="clickMD()">My data</v-btn>
        </v-row>
        <v-container grid-list-md/>
        <v-row no-gutters align="center" justify="center">
          <v-btn color="#F7DB5E" v-on:click="clickMW()">My Wallet</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
export default {
  name: "MyProfile",
  data: () => ({
  }),
  props: {
    idUsuario: { type: String, default: "" },
  },
  components: {
    ToolbarSpecial,
  },
  computed: {
    persistData();
  },

  methods: {
    clickMD(){
      this.$router.push({
        name: "UserProfile",
        params: { idUsuario: this.idUsuario }
      });
    },
    clickMW(){
      this.$router.push({
        name: "UserWallet",
        params: { idUsuario: this.idUsuario }
      });
    },
    persistData(){
      alert(this.idUsuario)
    }
  }
};
</script>