<template class="html">
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-alert :type="typeAlert" v-if="alert" dimissable>{{ textAlert }}</v-alert>
    <v-row align="center">
      <v-col align="center">
    <v-card class="justify-center mx-auto my-5" width="1200" height="auto">
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
              @click="getUsersID()"
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="conceptT"
              :rules="[(v) => !!v || 'UniPoints concept is required']"
              label="Concept of Reward"
              align-left
              v-on:keyup.enter="createTransaction()"
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="money"
              :rules="[v => (v >= 0 && v <= 7500) || 'The limit is in 7500 UniPoints']"
              label="UniPoints to deliver"
              align-left
              v-on:keyup.enter="createTransaction()"
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
      </v-col>
    </v-row>
    <Footer/>
  </v-app>
</template>
<style scoped>
  html { overflow-y: auto !important; }
</style>
<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
import Footer from "@/components/Footer"
const axios = require("axios");
export default {
  name: "TransactionCreation",
  data: () => ({
    valid: true,
    idUserTo:"",
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
    alert: false,
    typeAlert: "",
    textAlert: "",
  }),
  props: {},
  components: {
    ToolbarSpecial,
    Footer
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
          password: this.$store.state.password,
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
            this.textAlert = response.data;
            if(response.data=="OK - Delivery complete"){
              this.valid = false
              this.typeAlert = "success";
              this.alert = true;
              this.goToMenu()
            }else{
              this.typeAlert = "error";
              this.alert = true;
            }
            
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }else{
        this.textAlert = "You need to fill all the fields";
        this.typeAlert = "warning";
        this.alert = true;
      }
    },
    goToMenu: function () {
     setTimeout(() => {
        this.valid = true
        this.$router.push({
          name: "Home"
        });
      }, 950);
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
          this.users = response.data;   
          for(var i = 0; i < this.users.length; i++) {
            if(this.users[i].id == this.$store.state.idUser){
              this.users.splice(i,1)
            }
          }
          
          this.convertData(this.users, 0);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      
    },
    getRewardsDatabase() {
      if(this.addTo!=""){
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getAllRewardsList/:"+this.idUserTo+"/:"+false, { headers })
        .then((response) => {
          this.unirewards = response.data;
          this.convertData(this.unirewards, 1);
          
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      }else{
        this.textAlert = "You need to fill all the fields";
        this.typeAlert = "warning";
        this.alert = true;
      }
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