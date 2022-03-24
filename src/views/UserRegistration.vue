<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="800" height="300">
      <v-toolbar color="#5B943D">
        <v-toolbar-title>
          User Form
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row no-gutters>
            <v-text-field
              v-model="username"
              :rules="bodyRules"
              label="Username"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="Password"
              v-model="password"
              class="input-group--focused"
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-row>
          <v-row> </v-row>
          <v-row>
            <v-col align="center" justify="center">
              <v-btn
                :disabled="!valid"
                color="green"
                class="mr-3"
                v-on:click="loginUser
          ()"
              >
                Log in
              </v-btn>

              <v-btn color="#0098D6" class="mr-0" v-on:click="goToRegistration()">
                Register
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
  name: "UserRegistration",
  data: () => ({
    valid: true,
    show:false,
    username: "",
    password: "",
    bodyRules: [
      (v) => !!v || "Data field is required",
      (v) => (v && v.length >= 3) || "Name must be less than 3 characters",
    ]
  }),
  components: {
    ToolbarSpecial,
  },
  computed: {},



  methods: {
    goToRegistration: function () {
      this.$router.push({
        name: "UserCreation",
        params: { idUser: this.username }
      });
      
    },
    goToHome: function () {
      this.$router.push({
        name: "Home",
        params: { idUser: this.username }
      });
      
    },
    loginUser() {
      if(this.$refs.form.validate()==true){
        var postData = {
        username: this.username,
        password: this.password
      };
      
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .post("http://localhost:3000/loginUser", postData, {headers})
        .then((response) => {
          //TODO Devolver de alguna manera solamente el nombre y no la id
            if(!(isNaN(response.data))){
              alert("Welcome to the plataform Mr/Mrs")
              this.$store.commit("SET_IDUSER",response.data)
              this.goToHome()
            }
        })
        .catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>