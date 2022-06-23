<template>
  <v-app id="keep" class="white">
    <v-toolbar color="#5B943D" app top dense fixed max-height="50">
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
    <v-alert :type="typeAlert" v-if="alert" dimissable>{{ textAlert }}</v-alert>
    <v-row align="center">
      <v-col align="center">
        <v-card class="justify-center mx-auto my-5" width="1000" height="auto">
          <v-toolbar color="#5B943D">
            <v-toolbar-title> My Profile </v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-text-field
              v-model="money"
              label="Amount of Points"
              align-left
              disabled
              outlined
              readonly
            ></v-text-field>
          </v-container>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="unirewards"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
              <v-col>
                <v-data-table
                  :headers="headers2"
                  :items="transactions"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
        <div class="text-center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure of delete your account Mr/Mrs {{ usname }}?
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
      <v-dialog v-model="dialog2" max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            Delete account from the platform
          </v-card-title>
          <v-card-text>
            Okay Mr/Mrs {{ username }}, you account is deleted! Exiting from the
            platform
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <Footer />
  </v-app>
</template>
<style scoped>
::v-deep .v-data-table-header {
  background-color: #5b943d;
}
</style>
<script>
import Footer from "@/components/Footer";
const axios = require("axios");
export default {
  name: "UserWallet",
  data: () => ({
    textAlert: "",
    typeAlert: "",
    alert: false,
    unirewards: [],
    transactions: [],
    money: 0,
    show: false,
    headers: [
      { text: "Name of UniReward", value: "nameUR", class: "#5B943D" },
      {
        text: "Description of UniReward",
        value: "descriptionUR",
        class: "#5B943D",
      },
      { text: "Cost (UniPoints)", value: "cost", class: "#5B943D" },
    ],
    headers2: [
      { text: "Type Operation", value: "typeTransaction", color: "#5B943D" },
      { text: "Points", value: "money", color: "#5B943D" },
      { text: "Name of UniReward", value: "UniRewardId", color: "#5B943D" },
      { text: "From", value: "fromAddress", color: "#5B943D" },
      { text: "To", value: "toAddress", color: "#5B943D" },
    ],
    dialog: false,
    dialog2: false,
  }),
  props: {},
  components: {
    Footer,
  },
  computed: {},
  mounted: function () {
    this.getUserWalletData();
  },
  methods: {
    goToMyProfile () {
      this.$router.push({
        name: "MyProfile",
      });
    },
    click(opc) {
      if (opc == true) {
        setTimeout(() => {
          this.theDeleteFuntion();
          setTimeout(() => {
            this.dialog2 = false;
          }, 1500);
        }, 250);
      }
    },
    deleteAccount() {
      this.dialog = true;
    },

    theDeleteFuntion(){
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
            this.dialog2 = true;
            this.$store.commit("SET_IDUSER", "");
            this.$store.commit("SET_ROLE", "");
            this.$store.commit("SET_PASSWORD", "");
            console.log("Server response: " + response.data);
            this.goHome();
          } else {
            alert(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    getUserWalletData() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get(
          "http://localhost:3000/getSpecificWallet/:" +
            this.$store.state.idUser,
          { headers }
        )
        .then((response) => {
          if (
            response.data !=
            "User data don't loaded - Reason: No user to load data"
          ) {
            this.money = response.data[0];
            if (response.data.length > 2) {
              this.unirewards = response.data[1];
              this.transactions = response.data[2];
            } else {
              this.transactions = response.data[1];
            }
          } else {
            this.textAlert =
              "Can't load user data, returning to principal menu";
            this.typeAlert = "error";
            this.alert = true;
            this.goHome();
          }
        })
        .catch((error) => {
          this.textAlert = error;
          this.typeAlert = "error";
          this.alert = true;
          this.goHome();
        });
    },
    goHome() {
      setTimeout(() => {
        this.$router.push({
          name: "Home",
        });
      }, 950);
    },
  },
};
</script>