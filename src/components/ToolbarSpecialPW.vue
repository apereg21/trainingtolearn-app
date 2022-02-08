<template>
<v-card
    color="white"
    height="60px"
  >
  <v-toolbar color="blue">
    <v-btn class="ma-2" color="red" justify="end" dark v-on:click="goToMyProfile() ">
      Cancel
      <v-icon dark right> mdi-close-circle </v-icon>
    </v-btn>
  </v-toolbar>
</v-card>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    goToMyProfile: function () {
      this.$router.push({
        name: "MyProfile",
      });
      
    },
  },
};
</script>
