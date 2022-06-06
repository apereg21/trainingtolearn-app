<template>
  <v-app id="keep" class="white">
    <v-toolbar color="#5B943D" app top dense fixed max-height="50">
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
    <v-row align="center">
      <v-col align="center">
        <v-img
          src="../../resources/Logo_Indra_Positivo_A.png"
          max-height="750"
          max-width="750"
        ></v-img>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure of logout from plataform?
          </v-card-title>

          <v-card-text> Select one of the options below </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
              v-on:click="click(false)"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
              v-on:click="click(true)"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Logout from the platform
          </v-card-title>
          <v-card-text class="text-h6">
            Okay Mr/Mrs {{ username }}, see you next time!
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <Footer />
  </v-app>
</template>
<script>
import Footer from "@/components/Footer";
const axios = require("axios");
export default {
  name: "Home",
  data: () => ({
    dialog: false,
    dialog2: false,
    username: "",
  }),
  props: {},
  components: {
    Footer,
  },
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
    click: function (opc) {
      if (opc == true) {
        setTimeout(() => {
          this.theLogOutFunction();
          setTimeout(() => {
            this.dialog2 = false;
          }, 1500);
        }, 250);
      }
    },
    logout: function () {
      this.dialog = true;
    },
    theLogOutFunction() {
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
          this.username = response.data;
          this.dialog = false;
          this.dialog2 = true;
          console.log(response);
          this.$store.commit("SET_IDUSER", "");
          this.$store.commit("SET_PASSWORD", "");
          this.$store.commit("SET_ROLE", "");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  },
  mounted: function () {},
};
</script>