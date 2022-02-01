<template>
<v-card
    color="white"
    height="60px"
  >
  <v-toolbar color="blue">
    <v-btn class="ma-2" color="red" justify="end" dark v-on:click="goToMenu() ">
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
    goToMenu: function () {
      alert('You select create a new account!')
      this.$router.push({
        name: "Home",
      });
      
    },
  },
};
</script>
