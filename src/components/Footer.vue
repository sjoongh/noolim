<template>
<footer class="footsie">
  <div class="leftFooter">
      <p>
         <span>Useful Links</span>
          <ul>
              <li class="list"><a href="/">HOME</a></li>
              <li class="list"><a href="/detail3">상세검색</a></li>
              <li class="list"><a href="/board/free">고객센터</a></li>
              <li v-if="this.$store.state.account.token == null" class="list"><a href="/login">로그인</a></li>
              <li v-if="this.$store.state.account.token != null" class="list"><a href="/logout">로그아웃</a></li>
              <li class="list"><a href="/mypage">마이페이지</a></li>
          </ul>

      </p>
  </div>
  <div class="middleFooter">
      <p>
         <span>Address</span>
          <ul>
              <li class="list">서울특별시 서초구</li>
              <li class="list">서초동 서초대로74길 33</li>
              <li class="list">02-3486-3456</li>
              <li class="list">bitacademy@bit.co.kr</li>
              <li class="list google"><a href="https://www.google.com/maps/place/%EB%B9%84%ED%8A%B8%EA%B5%90%EC%9C%A1%EC%84%BC%ED%84%B0/@37.4945301,127.0275661,18.51z/data=!4m5!3m4!1s0x0:0x44f6db1c2b6c3bf7!8m2!3d37.4946287!4d127.0276197">View on Google Maps</a></li>

          </ul>

      </p>
  </div>
  <div class="rightFooter">
      <p>
         <span>Legal</span>
          <ul>
              <li class="list">Copyright &copy;2021</li>
              <li class="list">All rights reserved.</li>
              <li class="list">Terms &amp; Conditions</li>
          </ul>

      </p>
  </div>

</footer>

</template>


<script>
export default {
  name:"Footer",

}
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nanum Gothic', sans-serif;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
body {
  
  height: 25vh;
  font-family: 'Raleway', sans-serif;
}
.footsie {
  background: #7bc4c4;
  border-top: 0.0625em solid lightgrey;
  bottom: 0;
  color: rgba(110, 110, 110, 0.95);
  height: auto;
  font-size: 1em;
  text-align: center;
  display: flex;
  flex-direction: row;
  cursor: default;
}
.footsie .leftFooter,
.footsie .rightFooter,
.footsie .middleFooter {
  flex: 1;
  padding: 0.2em;
}
.leftFooter li a:hover{
  color: #fff;
}
.footsie ul {
  list-style-type: none;
}
.footsie .list {
  padding-top: 0.6em;
}
.footsie .list a {
  text-decoration: none;
  color: rgba(110, 110, 110, 0.95);
}
.footsie .google {
  text-decoration: underline;
}
.footsie p {
  padding: 1.25em;
}
.footsie span {
  font-size: 1.4em;
  color: #ffffff;
  font-weight: 800;
}



</style>