<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="800" height="525">
      <v-toolbar color="#5B943D">
        <v-toolbar-title> Course Form </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row no-gutters>
            <v-text-field
              v-model="name"
              :rules="bodyRules"
              label="Name Course"
              required
              align-center
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="descriptionUR"
              :rules="bodyRules"
              label="Description Course"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="costReward"
              type="number"
              label="Unipoints to complete Course"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
              <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="User's Password"
                v-model="password"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-select
              class="mr-3"
              v-model="userCourse"
              :items="users"
              :rules="[(v) => !!v || 'User is required']"
              label="User in Course"
              required
            ></v-select>
          </v-row>
          <v-row>
            <v-col align="center" justify="center">
              <v-btn
                :disabled="!valid"
                color="green"
                class="mr-3"
                v-on:click="createReward()"
              >
                Create Course
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
  name: "RewardCreation",
  data: () => ({
    valid: true,
    name: "",
    descriptionUR: "",
    imageUR:
      "https://edit.org/images/cat/diplomas-certificados-big-2020042416.jpg",
    password: "",
    show: false,
    costReward: 0,
    userCourse: "",
    bodyRules: [
      (v) => !!v || "Data field is required",
      (v) => (v && v.length >= 3) || "Name must be less than 3 characters",
    ],
    users: [],
    select: null,
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
            console.log("The name is: " + response.data)
            this.username = response.data
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
    },
    createReward() {
      this.$refs.form.validate();
      var postData = {
        nameUR: this.name,
        descriptionUR: this.descriptionUR,
        imageUR: this.imageUR,
        costReward: parseInt(this.costReward),
        username: this.username,
        password: this.$store.state.password,
        usernameCourse: this.userCourse,
      };
      console.log(this.username)
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .post("http://localhost:3000/createNewReward", postData, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          alert(response.data);
          if(response.data == "OK - Reward will be created"){
            this.goHome();
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
    convertData(vector) {
      for (let i = 0; i < vector.length; i++) {
        this.users[i] = vector[i].username;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    goHome() {
      this.$router.push({
        name: "Home",
      });
    }
  },
  mounted() {
    this.getUsersDatabase();
    this.getUserUsername();
  },
};
</script>