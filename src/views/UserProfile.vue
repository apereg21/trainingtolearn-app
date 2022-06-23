<template>
  <v-app id="keep" class="white">
    <v-toolbar color="#5B943D" app top dense fixed max-height="50">
      <v-btn
        class="ma-2"
        color="#F7DB5E"
        justify="end"
        v-on:click="goToMyProfile()"
      >
        <v-icon> mdi-arrow-left </v-icon>
        Go Back
      </v-btn>
      <v-spacer />
      <v-btn
        class="ma-2"
        color="#F7DB5E"
        align="right"
        justify="end"
        v-on:click="deleteAccount()"
      >
        <v-icon> mdi-account-off </v-icon>
        Delete Account
      </v-btn>
    </v-toolbar>
    <v-alert :type="typeAlert" v-if="alert" dimissable>{{ textAlert }}</v-alert>
    <v-row align="center">
      <v-col align="center">
        <v-card class="justify-center mx-auto my-5" width="800" height="auto">
          <v-toolbar color="#5B943D">
            <v-toolbar-title> My Profile </v-toolbar-title>
          </v-toolbar>
          <v-container fuild v-if="visibility1">
            <v-text-field
              v-model="name"
              label="Name"
              disabled
              outlined
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model="fullsurname"
              label="Full Surname"
              disabled
              outlined
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model="usname"
              label="Username"
              disabled
              outlined
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model="uspass"
              label="Password"
              disabled
              outlined
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model="typeuser"
              label="Type of User"
              disabled
              outlined
              readonly
            >
            </v-text-field>
          </v-container>
          <v-container fuild v-if="visibility2">
            <v-text-field
              v-model="nameN"
              label="New Name"
              v-on:keyup.enter="changeData()"
            >
            </v-text-field>
            <v-text-field
              v-model="fullsurnameN"
              label="New Full Surname"
              v-on:keyup.enter="changeData()"
            >
            </v-text-field>
            <v-text-field
              v-model="usnameN"
              label="New UserName"
              v-on:keyup.enter="changeData()"
            >
            </v-text-field>
            <v-text-field
              v-model="uspassN"
              label="New Password"
              v-on:keyup.enter="changeData()"
            >
            </v-text-field>
            <v-row no-gutters>
              <v-col align="center" justify="center">
                <v-btn
                  color="#F7DB5E"
                  v-if="visibility2"
                  v-on:click="changeData()"
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
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure of delete your account Mr/Mrs {{ usname }}?
          </v-card-title>

          <v-card-text> Select one of the options below </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
              v-on:click="click(false)"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
              v-on:click="click(true)"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            Delete account from the platform
          </v-card-title>
          <v-card-text>
            Okay Mr/Mrs {{ username }}, you account is deleted! Exiting from the
            platform
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <Footer />
  </v-app>
</template>

<script>
const axios = require("axios");
import Footer from "@/components/Footer";
export default {
  name: "UserProfile",
  data: () => ({
    dialog: false,
    dialog2: false,
    alert: false,
    typeAlert: "",
    textAlert: "",
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

  props: {},

  components: {
    Footer,
  },
  computed: {
    idUser() {
      return this.$store.state.idUser;
    },
  },
  mounted: function () {
    this.findData();
  },
  methods: {
    goToMyProfile: function () {
      this.$router.push({
        name: "MyProfile",
      });
    },
    click: function (opc) {
      if (opc == true) {
        setTimeout(() => {
          this.theDeleteFuntion();
          setTimeout(() => {
            this.dialog2 = false;
          }, 1500);
        }, 250);
      }
    },
    deleteAccount: function () {
      this.dialog = true;
    },

    theDeleteFuntion: function () {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const idToNumber = parseInt(this.$store.state.idUser);
      const postData = {
        id: idToNumber,
      };
      axios
        .post("http://localhost:3000/deleteUser", postData, { headers })
        .then((response) => {
          if (!response.data.includes("can't")) {
            this.dialog2 = true;
            this.$store.commit("SET_IDUSER", "");
            this.$store.commit("SET_ROLE", "");
            this.$store.commit("SET_PASSWORD", "");
            console.log("Server response: " + response.data);
            this.goHome();
          } else {
            alert(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
    activateFields() {
      if (this.checkbox == true) {
        this.visibility1 = false;
        this.visibility2 = true;
        this.nameN = this.name;
        this.uspassN = this.uspass;
        this.fullsurnameN = this.fullsurname;
        this.usnameN = this.usname;
      } else {
        this.visibility1 = true;
        this.visibility2 = false;
      }
    },
    changeData() {
      var postData = {
        usernameN: this.usnameN,
        passwordN: this.uspassN,
        fullSurnameN: this.fullsurnameN,
        nameN: this.nameN,
        username: this.usname,
        password: this.uspass,
        changes: [],
      };

      for (var key in postData) {
        var value = postData[key];
        if (
          value.length > 0 &&
          value != null &&
          (value != "changes" || value != "username" || value != "password")
        ) {
          switch (key) {
            case "usernameN":
              if (postData[key] != this.usname) {
                postData.changes.push("u");
              } else {
                delete postData[key];
              }
              break;
            case "passwordN":
              if (postData[key] != this.uspass) {
                postData.changes.push("p");
              } else {
                delete postData[key];
              }
              break;
            case "fullSurnameN":
              if (postData[key] != this.fullsurname) {
                postData.changes.push("f");
              } else {
                delete postData[key];
              }
              break;
            case "nameN":
              if (postData[key] != this.name) {
                postData.changes.push("n");
              } else {
                delete postData[key];
              }
              break;
            default:
          }
        }
      }

      if (postData.changes.length != 0) {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        axios
          .post("http://localhost:3000/changeUserData", postData, { headers })
          .then((response) => {
            this.alert = false;
            console.log("Server response: " + response.data);
            this.textAlert = response.data;
            if (this.textAlert == "OK - User data changed") {
              this.usName != this.usnameN
                ? (this.usname = this.usnameN)
                : this.password != this.uspassN
                ? (this.uspass = this.uspassN)
                : this.name != this.nameN
                ? (this.name = this.nameN)
                : this.fullsurname != this.fullsurnameN
                ? (this.fullsurname = this.fullsurnameN)
                : this.$store.commit("SET_PASSWORD", this.uspass);
              this.typeAlert = "success";
              this.alert = true;
              this.sleep(950);
              this.checkbox = false;
              this.visibility1 = true;
              this.visibility2 = false;
            } else {
              this.typeAlert = "error";
              this.alert = true;
              this.checkbox = false;
              this.sleep(950);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      } else {
        this.textAlert = "Nothing changed";
        this.typeAlert = "info";
        this.checkbox = false;
        this.alert = true;
        this.sleep(950);
      }
    },
    findData() {
      this.alert = false;
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get(
          "http://localhost:3000/getSpecificUser/:" + this.$store.state.idUser,
          { headers }
        )
        .then((response) => {
          this.textAlert = response.data;
          if (
            response.data !=
            "User data don't loaded - Reason: No user to load data"
          ) {
            this.name = response.data.name;
            this.uspass = response.data.password;
            this.fullsurname = response.data.fullSurname;
            this.usname = response.data.username;
            if (response.data.typeUser == "I") {
              this.typeuser = "Instructor";
            } else {
              this.typeuser = "Normal User";
            }
          } else {
            this.typeAlert = "error";
            this.alert = true;
            this.goHome();
          }
        })
        .catch((error) => {
          this.textAlert = error;
          this.typeAlert = "error";
          this.alert = true;
          this.goHome();
        });
    },
    goHome() {
      setTimeout(() => {
        this.$router.push({
          name: "Home",
        });
      }, 950);
    },
    sleep(seconds) {
      setTimeout(() => {
        this.alert = false;

        this.activateFields();
      }, seconds);
    },
  },
};
</script>