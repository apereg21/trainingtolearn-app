<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="1200" height="450">
      <v-toolbar color="#5B943D">
        <v-toolbar-title> UniReward Delivery </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row no-gutters>
            <v-text-field
              v-model="money"
              :rules="[(v) => !!v || 'UniPoints Field is required']"
              label="UniPoints to deliver"
              align-left
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-select
              v-model="uniR"
              :items="unirewards"
              :rules="[(v) => !!v || 'UniReward is required']"
              label="UniReward Wanted"
              align-left
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              label="Password User"
              v-model="password"
              class="input-group--focused"
              @click:append="show = !show"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-col align="center" justify="center">
              <v-btn
                :disabled="!valid"
                color="green"
                class="mr-3"
                v-on:click="createTransaction()"
              >
                Create Reward
              </v-btn>

              <v-btn color="#FF9300" class="mr-0" @click="reset">
                Reset Data
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecialRW";
const axios = require("axios");
export default {
  name: "TransactionCreation",
  data: () => ({
    valid: true,
    addFrom: "",
    addTo: "",
    money: 0,
    uniR: "",
    name: "",
    typeTrans: "",
    conceptT: "",
    show: false,
    password: "",
    bodyRules: [(v) => !!v || "Data field is required"],
    users: [],
    unirewards: [],
  }),
  props: {},
  components: {
    ToolbarSpecial,
  },
  computed: {},
  methods: {
    getUserUsername(){
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        axios
          .get("http://localhost:3000/getUsersName/:"+this.$store.state.idUser, {
            headers,
          })
          .then((response) => {
            console.log("Server response: " + response.data)
            this.addFrom = response.data
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
    },
    createTransaction() {
      if (this.$refs.form.validate() == true) {
        var postData = {
          fromAddressUN: "System",
          toAddressUN: this.addFrom,
          typeT: "U",
          uniRewardT: this.uniR,
          moneyTo: parseInt(this.money),
          passwordFrom: this.password,
          concept: "default",
        };

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        axios
          .post("http://localhost:3000/createNewTransaction", postData, {
            headers,
          })
          .then((response) => {
            console.log("Server response: " + response.data);
            alert(response.data);
            this.goToMenu();
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    getUsersDatabase() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .get("http://localhost:3000/getAllUsersList", { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.users = response.data;
          this.users.splice(parseInt(this.$store.state.idUser)-1,1)
          this.users.splice(0, 1);
          this.convertData(this.users, 0);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    getRewardsDatabase() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .get("http://localhost:3000/getAllRewardsList/:"+this.$store.state.idUser+"/:"+false, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.unirewards = response.data;
          this.convertData(this.unirewards, 1);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    convertData(vector, opc) {
      for (let i = 0; i < vector.length; i++) {
        if (opc == 0) {
          this.users[i] = vector[i].username;
        } else {
          this.unirewards[i] = vector[i].nameUR;
        }
      }
    },
    goToMenu: function () {
      this.$router.push({
        name: "Home",
      }); 
    },
  },
  mounted() {
    this.getUsersDatabase();
    this.getRewardsDatabase();
    this.getUserUsername();
  },
};
</script>