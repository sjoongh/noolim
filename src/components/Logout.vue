<template lang="pug">
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  created() {
    var token = this.$store.state.account.token;
    var user = this.$store.state.account.user;

    if (token) {
      alert("로그아웃 합니다");
      token = null;
      user = null;
      this.setToken(token);
      this.setUser(user);
      this.fetchUser();
    }
    this.$router.replace("/");
  },
  methods: {
    ...mapActions(["fetchUser"]),
    ...mapMutations(["setToken"]),
    ...mapMutations(["setUser"])
  }
};
</script>
