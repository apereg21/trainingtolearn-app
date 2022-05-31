<template>
  <v-app id="keep" class="white">
    <ToolbarSpecialPW />
    <v-card class="justify-center mx-auto my-5" width="800" height="725">
      <v-toolbar color="#5B943D">
        <v-toolbar-title> My Profile </v-toolbar-title>
      </v-toolbar>
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
            <v-btn color="#F7DB5E" v-if="visibility2" v-on:click="changeData()"
              >Change Data</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-container fuild>
        <v-row no-gutters justify="center">
            <v-checkbox
             
              v-model="checkbox"
              label="Do you want to change Data?"
              v-on:click="activateFields()"
            />
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
  
  props: {

  },

  components: {
    ToolbarSpecialPW,
  },
  computed: {
    idUser() {
      return this.$store.state.idUser;
    }    
  },
  mounted: function(){
    this.findData()
  },
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
        "username": this.usname,
        "password": this.uspass,
        "changes": []
      };

      for (var key in postData) {
        var value = postData[key];
        if((value.length > 0 && value != null) && (value!="changes" ||value!="username" || value!="password")){
          console.log(key)
          switch (key) {
            case 'usernameN':
              if(postData[key]!=this.usname){
                postData.changes.push("u")
              }else{
                delete postData[key];
              }    
            break;
            case 'passwordN':
             if(postData[key]!=this.uspass){
                postData.changes.push("p")
              }else{
                delete postData[key];
              } 
            break;
            case 'fullSurnameN':
              if(postData[key]!=this.fullsurname){
                postData.changes.push("f")
              }else{
                delete postData[key];
              } 
            break;
            case 'nameN':
              if(postData[key]!=this.name){
                postData.changes.push("n")
              }else{
                delete postData[key];
              } 
            break;
            default:
          }
        }
      }

      console.log(postData.changes)

      if(postData.changes.length !=0){
        const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        };

      axios
        .post("http://localhost:3000/changeUserData", postData, {headers})
        .then((response) => {
          console.log("Server response: " + response.data);
          alert(response.data)
          if(response.data == "User data changed"){
            this.usName!=this.usnameN ? this.usname=this.usnameN : console.log("Username not changed")
            this.password!=this.uspassN ? this.uspass=this.uspassN : console.log("User password not changed")
            this.name!=this.nameN ? this.name=this.nameN : console.log("User name not changed")
            this.fullsurname!=this.fullsurnameN ?  this.fullsurname= this.fullsurnameN : console.log("User fullsurname not changed")
            this.checkbox = false
            this.visibility1 = true;
            this.visibility2 = false;
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error)
        });
      }else{
        alert("Nothing changed");
      }
    },
    findData() {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get("http://localhost:3000/getSpecificUser/:" + this.$store.state.idUser, { headers })
        .then((response) => {
          console.log(response.data)
          if(response.data != "User data don't loaded - Reason: No user to load data"){
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
          }else{
            alert(response.data)
            this.goHome()
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    goHome() {
      this.$router.push({
        name: "Home",
      });
    }
  }
  
};
</script>