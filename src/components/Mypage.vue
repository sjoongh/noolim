<template>
  <div>
    <div id="tabs" class="container">
      <h1>My Account</h1>

      <div class="tabs">
        <a
          v-on:click="activetab = 1"
          v-bind:class="[activetab === 1 ? 'active' : '']"
          >내 글 보기</a
        >

        <a
          v-on:click="activetab = 3"
          v-bind:class="[activetab === 3 ? 'active' : '']"
          >회원탈퇴</a
        >
      </div>

      <div class="content">
        <div v-if="activetab === 1" class="tabcontent">
          <TabComment />
        </div>
        <div v-if="activetab === 3" class="tabcontent">
          <Update />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Update from "./Update";
import TabComment from "./TabComment";
export default {
  components: {
    Update,
    TabComment
  },
  data() {
    return {
      activetab: 1
    };
  }
};
</script>

<style scoped>
/* Import Google Font */
@import url(https://fonts.googleapis.com/css?family=Nunito+Sans);
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 30px;
}
/* STYLING */
.container {
  /* max-width: 620px;  */
  min-width: 420px;
  margin: 40px auto;
  font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
  color: #888;
  /* top: 150px; */
}
/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
}
.tabs ul {
  list-style-type: none;
  margin-left: 20px;
  border-bottom: 3px solid #51abf3;
}
.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  color: rgb(92, 92, 92);
  border-right: none;
  text-decoration: none;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
/* .tabs a:last-child { 
    border-right: 1px solid #ccc;
} */
/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: rgb(255, 255, 255);

  color: rgb(0, 0, 0);
}
/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  border-bottom: 3px solid #7bc4c4;
  cursor: default;
}
/* Style the tab content */
/* .tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1
}
h4{
    text-align: left;
    padding: 0;
} */
.content {
  padding: 0;
  margin: -40px;
}
</style>
