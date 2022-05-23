<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="1200" height="600">
      <v-toolbar color="#5B943D">
        <v-toolbar-title> Reward Of UniPoints </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row no-gutters>
            <v-select
              v-model="addTo"
              :items="users"
              :rules="[(v) => !!v || 'User is required']"
              label="User Destiny"
              required
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-select
              v-model="uniR"
              :items="rewardField"
              :rules="[(v) => !!v || 'UniReward is required']"
              label="UniReward linked to this UniPoints"
              align-left
              v-on:click="getUsersID()"
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="conceptT"
              :rules="[(v) => !!v || 'UniPoints concept is required']"
              label="Concept of Reward"
              align-left
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="money"
              :rules="[(v) => !!v || 'UniPoints Field is required']"
              label="UniPoints to deliver"
              align-left
            ></v-text-field>
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
import ToolbarSpecial from "@/components/ToolbarSpecial";
const axios = require("axios");
export default {
  name: "TransactionCreation",
  data: () => ({
    valid: true,
    idUserTo:"",
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
  computed: {
    rewardField: function(){
      return this.unirewards 
    },
  },
  methods: {
    getUsersID(){
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getUserID/:"+this.addTo, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.idUserTo = response.data;
          this.getRewardsDatabase();
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    createTransaction() {
      if (this.$refs.form.validate() == true) {
        var postData;
        postData = {
          fromAddressUN: this.addFrom,
          toAddressUN: this.addTo,
          typeT: "M",
          moneyTo: parseInt(this.money),
          passwordFrom: this.password,
          concept: this.conceptT,
          uniRewardId: this.uniR
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
            this.goToMenu()
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    },
    goToMenu: function () {
      this.$router.push({
        name: "Home",
      });
      
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
        .get("http://localhost:3000/getAllRewardsList/:"+this.idUserTo+"/:"+false, { headers })
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
  },
  mounted() {
    this.getUsersDatabase();
    this.getUserUsername();
  },
};
</script>