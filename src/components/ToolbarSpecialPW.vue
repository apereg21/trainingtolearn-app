<template>
<v-card
    color="white"
    height="60px"
  >
  <v-toolbar color="#DAF7A6">
    <v-btn class="ma-2" color="#A4BB7A" justify="end" v-on:click="goToMyProfile()">
      <v-icon> mdi-arrow-left </v-icon>
      Go Back
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
