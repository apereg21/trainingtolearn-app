<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="800" height="525">
      <v-toolbar dark color="blue">
        <v-toolbar-title class="text-h6 white--text pl-0">
          Reward Form
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row no-gutters>
            <v-text-field
              v-model="name"
              :rules="bodyRules"
              label="Name Reward"
              required
              align-center
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="descriptionUR"
              :rules="bodyRules"
              label="Description Reward"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="imageUR"
              :rules="bodyRules"
              label="Image URL"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="costReward"
              type="number"
              :rules="bodyRules"
              label="Cost of Reward"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-select
                class="mr-3"
                v-model="username"
                :items="users"
                :rules="[(v) => !!v || 'User is required']"
                label="User From"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Password User"
                v-model="password"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center" justify="center">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-3"
                v-on:click="createReward()"
              >
                Create Reward
              </v-btn>

              <v-btn color="warning" class="mr-0" @click="reset">
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
    imageUR: "",
    password:"",
    show:false,
    costReward: 0,
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
    createReward() {
      this.$refs.form.validate();
      var postData = {
        nameUR: this.name,
        descriptionUR: this.descriptionUR,
        imageUR: this.imageUR,
        costReward: parseInt(this.costReward),
        username:this.username,
        password:this.password
      };
      alert(postData.costReward)
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .post("http://localhost:3000/createNewReward", postData, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          alert(response.data);
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
  },
  mounted() {
    this.getUsersDatabase();
  },
};
</script>