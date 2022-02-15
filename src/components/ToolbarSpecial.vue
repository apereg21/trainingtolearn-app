<template>
<v-card
    color="white"
    height="60px"
  >
  <v-toolbar color="#DAF7A6">
    <v-btn class="ma-2" color="#A4BB7A" justify="end" v-on:click="goToMenu()">
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
    goToMenu: function () {
      this.$router.push({
        name: "Home",
      });
      
    },
  },
};
</script>
