<template>
  <div class="home">
    <Main />
    <Popular2 />
    <Location />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main";
import Popular2 from "@/components/Popular2";
import Location from "@/components/Location";

export default {
  name: "Home",
  components: {
    Main,
    Popular2,
    Location
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>
