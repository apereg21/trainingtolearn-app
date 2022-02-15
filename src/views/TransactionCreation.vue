<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="1200" height="550">
      <v-toolbar color="#DAF7A6">
        <v-toolbar-title>
          Reward Form
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row no-gutters>
            <v-select
              v-model="addFrom"
              :items="users"
              :rules="[(v) => !!v || 'User is required']"
              label="User From"
              required
            ></v-select>
          </v-row>
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
            <v-col>
              <v-container fluid>
                <v-switch
                  v-model="switch1"
                  label="Delivery UniPoints"
                  @click="proveSwitch"
                ></v-switch>
                <v-switch
                  v-model="switch2"
                  label="UniReward Adquisition"
                  @click="proveSwitch2"
                ></v-switch>
              </v-container>
            </v-col>
            <v-col>
              <v-text-field
                v-model="money"
                :rules="[(v) => !!v || 'UniPoints Field is required']"
                label="UniPoints cost"
                :disabled="!visibility1"
                
                align-left
              ></v-text-field>
              <v-select
                v-model="uniR"
                :items="unirewards"
                :rules="[(v) => !!v || 'UniReward is required']"
                label="UniReward Wanted"
                :disabled="!visibility2"
                align-left
              ></v-select>
            </v-col>
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
    addFrom: "",
    addTo: "",
    money: 0,
    uniR: "",
    name: "",
    typeTrans: "",
    switch1: true,
    switch2: false,
    visibility1:true,
    visibility2:false,
    show: false,
    password: "",
    bodyRules: [
      (v) => !!v || "Data field is required"
    ],
    users: [],
    unirewards: [],
  }),
  props: {},
  components: {
    ToolbarSpecial,
  },
  computed: {},
  methods: {
    proveSwitch() {
      if (this.switch1 == true) {
        if (this.switch2 == true) {
          this.switch2 = false;
        }
      }
      this.changeVisibility()
    },
    proveSwitch2() {
      if (this.switch2 == true) {
        if (this.switch1 == true) {
          this.switch1 = false;
        }
      }
      this.changeVisibility()
    },
    createTransaction() {
      if (this.$refs.form.validate() == true) {
        var postData;
        if (this.switch1 == true) {
          this.typeTrans = "M";
          postData = {
            fromAddressUN: this.addFrom,
            toAddressUN: this.addTo,
            typeT: this.typeTrans,
            moneyTo: parseInt(this.money),
            passwordFrom: this.password,
          };
        } else {
          this.typeTrans = "U";
          postData = {
            fromAddressUN: this.addFrom,
            toAddressUN: this.addTo,
            typeT: this.typeTrans,
            uniRewardT: this.uniR,
            moneyTo: parseInt(this.money),
            passwordFrom: this.password,
          };
        }

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
          this.users.splice(0, 1)
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
        .get("http://localhost:3000/getAllRewardsList", { headers })
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
    changeVisibility(){
      if(this.switch1==true){
        this.visibility1=true
        this.visibility2=false
      }else{
        if(this.switch2==true){
          this.visibility1=true
          this.visibility2=true
        }
        else{
          this.visibility1=false
          this.visibility2=false
        }
      }
    }
  },
  mounted() {
    this.getUsersDatabase();
    this.getRewardsDatabase();
  },
};
</script>