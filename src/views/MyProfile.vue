<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
<v-card class="justify-center mx-auto my-5" width="800" height="625">
      <v-toolbar color="#DAF7A6">
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
          <v-btn color="#A4BB7A" v-on:click="clickMD()">My data</v-btn>
        </v-row>
        <v-container grid-list-md/>
        <v-row no-gutters align="center" justify="center">
          <v-btn color="#A4BB7A" v-on:click="clickMW()">My Wallet</v-btn>
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
  props: {},
  components: {
    ToolbarSpecial,
  },
  computed: {},

  methods: {
    clickMD(){
      this.$router.push({
        name: "UserProfile",
      });
    },
    clickMW(){
      this.$router.push({
        name: "UserWallet",
      });
    }
  }
};
</script>