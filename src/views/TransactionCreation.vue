<template>
  <v-app id="keep" class="white">
    <ToolbarSpecial />
    <v-card class="justify-center mx-auto my-5" width="800" height="625">
      <v-toolbar color="#5B943D">
        <v-toolbar-title> Reward Selection </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-container grid-list-md />
        <v-container grid-list-md />
        <v-container grid-list-md />
        <v-container grid-list-md />
        <v-container grid-list-md />
        <v-container grid-list-md />
        <v-container grid-list-md />
        <v-row no-gutters align="center" justify="center">
          <v-btn color="#F7DB5E" v-on:click="clickRUP()">UniPoints</v-btn>
        </v-row>
        <v-container grid-list-md />
        <v-row no-gutters align="center" justify="center">
          <v-btn color="#F7DB5E" v-on:click="clickRUR()">UniReward</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import ToolbarSpecial from "@/components/ToolbarSpecial";
export default {
  name: "TransactionCreation",
  data: () => ({}),
  props: {},
  components: {
    ToolbarSpecial,
  },
  computed: {},

  methods: {
    clickRUP() {
      this.$router.push({
        name: "RewardUP",
      });
    },
    clickRUR() {
      this.$router.push({
        name: "RewardUR",
      });
    },
  },
};
</script>