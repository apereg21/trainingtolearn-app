<template>
  <v-app id="keep" class="white">
    <ToolbarSpecialPW />
    <v-card class="justify-center mx-auto my-5" width="800" height="725">
      <v-toolbar color="#DAF7A6">
        <v-toolbar-title> My Profile </v-toolbar-title>
      </v-toolbar>
      <v-container fuild>
        <v-text-field
          v-model="username"
          label="username"
          align-left
        ></v-text-field>
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Password User"
          v-model="password"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-row>
          <v-col align="center" justify="center">
            <v-btn color="#A4BB7A" v-on:click="getUserID()">Load Data</v-btn>
          </v-col>
          <v-col>
            <v-checkbox
              v-model="checkbox"
              label="Do you want to change Data?"
              v-on:click="activateFields()"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container fuild v-if="visibility1">
        <v-text-field 
          v-model="name" 
          label="Name" 
          disabled 
          outlined 
          readonly>
        </v-text-field>
        <v-text-field
          v-model="fullsurname"
          label="Full Surname"
          disabled
          outlined
          readonly>
        </v-text-field>
        <v-text-field
          v-model="usname"
          label="Username"
          disabled
          outlined
          readonly>
        </v-text-field>
        <v-text-field
          v-model="uspass"
          label="Password"
          disabled
          outlined
          readonly>
        </v-text-field>
        <v-text-field
          v-model="typeuser"
          label="Type of User"
          disabled
          outlined
          readonly>
        </v-text-field>
      </v-container>
      <v-container fuild v-if="visibility2">
        <v-text-field
          v-model="nameN"
          label="New Name"
          >
        </v-text-field>
        <v-text-field
          v-model="fullsurnameN"
          label="New Full Surname"
          >
        </v-text-field>
        <v-text-field
          v-model="usnameN"
          label="New UserName"
          >
        </v-text-field>
        <v-text-field
          v-model="uspassN"
          label="New Password"
          >
        </v-text-field>
        <v-row no-gutters>
          <v-col align="center" justify="center">
            <v-btn color="#A4BB7A" v-if="visibility2" v-on:click="changeData()"
              >Change Data</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecialPW from "@/components/ToolbarSpecialPW";
const axios = require("axios");
export default {
  name: "UserProfile",
  data: () => ({
    id: "",
    userData: [],

    username: "",
    password: "",
    prueba: "",

    name: "",
    uspass: "",
    fullsurname: "",
    usname: "",
    typeuser: "",

    nameN: "",
    uspassN: "",
    fullsurnameN: "",
    usnameN: "",

    show: false,
    checkbox: false,
    visibility1: true,
    visibility2: false,
  }),
  props: {},
  components: {
    ToolbarSpecialPW,
  },
  computed: {},

  methods: {
    activateFields() {
      if (this.checkbox == true) {
        this.visibility1 = false;
        this.visibility2 = true;
        this.nameN= this.name;
        this.uspassN= this.uspass;
        this.fullsurnameN= this.fullsurname;
        this.usnameN= this.usname;
      } else {
        this.visibility1 = true;
        this.visibility2 = false;
      } 
    },
    changeData() {
      var postData = {
        "usernameN": this.usnameN,
        "passwordN": this.uspassN,
        "fullSurnameN": this.fullsurnameN,
        "nameN": this.nameN,
        "username": this.username,
        "password": this.password,
        "changes": []
      };

      for (var key in postData) {
        var value = postData[key];
        if((value.length > 0 && value != null) && (value!="changes" ||value!="username" || value!="password")){
          console.log(key)
          switch (key) {
            case 'usernameN':
              console.log("Habemus")
              postData.changes.push("u")
            break;
            case 'passwordN':
              console.log("Habemus")
             postData.changes.push("p")
            break;
            case 'fullSurnameN':
              console.log("Habemus")
              postData.changes.push("f")
            break;
            case 'nameN':
              console.log("Habemus")
              postData.changes.push("n")
            break;
            default:
          }
        }
        else{
          delete postData[key];
        }
      }

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      axios
        .post("http://localhost:3000/changeUserData", postData, {headers})
        .then((response) => {
          console.log("Server response: " + response.data);
          alert(response.data)
        })
        .catch((error) => {
          console.log(error);
          alert(error)
        });
    },
    getUserData(id) {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getSpecificUser/:" + id, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.name = response.data.name;
          this.uspass = response.data.password;
          this.fullsurname = response.data.fullSurname;
          this.usname = response.data.username;
          if (response.data.typeUser == "I") {
            this.typeuser = "Instructor";
          } else {
            this.typeuser = "Normal User";
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    getUserID() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/getSpecificUserID/", data, { headers })
        .then((response) => {
          console.log("Server response: " + response.data);
          this.getUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  },
};
</script>