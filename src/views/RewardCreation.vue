<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-alert :type="typeAlert" v-if="alert" dimissable>{{ textAlert }}</v-alert>
    <v-row align="center">
      <v-col align="center">
        <v-card class="justify-center mx-auto my-5" width="800" height="auto">
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
                  :rules="[v => (v >= 0 && v <= 7500) || 'The limit is in 7500 UniPoints']"
                  required
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
                  v-on:keyup.enter="createReward()"
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
      </v-col>
    </v-row>

    <Footer />
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
import Footer from "@/components/Footer";
const axios = require("axios");
export default {
  name: "RewardCreation",
  data: () => ({
    alert: false,
    typeAlert: "",
    textAlert: "",
    valid: true,
    name: "",
    descriptionUR: "",
    imageUR:
      "https://edit.org/images/cat/diplomas-certificados-big-2020042416.jpg",
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
    Footer,
  },
  computed: {},

  methods: {
    getUserUsername() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .get(
          "http://localhost:3000/getUsersName/:" + this.$store.state.idUser,
          {
            headers,
          }
        )
        .then((response) => {
          this.username = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    createReward() {
      this.alert = false;
      if (this.$refs.form.validate() && this.users.length > 0) {
        var postData = {
          nameUR: this.name,
          descriptionUR: this.descriptionUR,
          imageUR: this.imageUR,
          costReward: parseInt(this.costReward),
          username: this.username,
          password: this.$store.state.password,
          usernameCourse: this.userCourse,
        };
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        axios
          .post("http://localhost:3000/createNewReward", postData, { headers })
          .then((response) => {
            console.log("Server response: " + response.data);
            if (response.data == "OK - Reward will be created") {
              this.valid = false,
              this.textAlert = response.data;
              this.typeAlert = "success";
              this.alert = true;
              this.goHome();
            } else {
              this.textAlert = response.data;
              this.typeAlert = "error";
              this.alert = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.textAlert = "You need to fill all the fields";
        this.typeAlert = "warning";
        this.alert = true;
      }
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
          this.users.splice(parseInt(this.$store.state.idUser) - 1, 1);
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
      setTimeout(() => {
        this.valid = true
        this.$router.push({
          name: "Home",
        });
      }, 950);
    },
  },
  mounted() {
    this.getUsersDatabase();
    this.getUserUsername();
  },
};
</script>