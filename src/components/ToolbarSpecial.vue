<template>
  <v-toolbar color="#5B943D" app top dense fixed max-height="50">
    <v-btn class="ma-2" color="#F7DB5E" justify="end" v-on:click="goToMenu()">
      <v-icon> mdi-arrow-left </v-icon>
      Go Back
    </v-btn>
  </v-toolbar>
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
