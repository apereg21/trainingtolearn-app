<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-row align="center">
      <v-col align="center">
        <v-card class="justify-center mx-auto my-5" width="300" height="auto">
          <v-toolbar color="#5B943D">
            <v-toolbar-title> My Profile </v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-row no-gutters align="center" justify="center">
              <v-btn color="#F7DB5E" v-on:click="clickMD()">My data</v-btn>
            </v-row>
            <v-container grid-list-md />
            <v-row no-gutters align="center" justify="center">
              <v-btn color="#F7DB5E" v-on:click="clickMW()">My Wallet</v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
import Footer from "@/components/Footer";
export default {
  name: "MyProfile",
  data: () => ({}),
  props: {},
  components: {
    ToolbarSpecial,
    Footer,
  },
  computed: {},

  methods: {
    clickMD() {
      this.$router.push({
        name: "UserProfile",
        params: { idUser: this.idUser },
      });
    },
    clickMW() {
      this.$router.push({
        name: "UserWallet",
        params: { idUser: this.idUser },
      });
    },
  },
};
</script>