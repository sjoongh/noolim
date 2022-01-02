<template>
  <div class="detail3" style="position: relative;">
    <div class="rela-block top-section grad-back" id="topSection">
      <div class="abs-cent-text top-text">
        <h1 class="big-text">상세검색</h1>
        <Search />
      </div>
    </div>

    <Detail1 />
    <Detail2 />
  </div>
</template>

<script>
import Search from "@/components/Search";
import Detail1 from "@/components/Detail1";
import Detail2 from "@/components/Detail2";
export default {
  name: "Detail3",
  components: {
    Search,
    Detail1,
    Detail2
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
/** 메인 이미지 설정*/
.rela-block {
  display: block;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
}
/** 메인 이미지 소스*/
.top-section {
  height: 47vh;
  background-color: cadetblue;
  background-size: cover;
}
/** 메인 텍스트 설정 */
.top-text {
  color: #fff;
  top: 58%;
  line-height: 28px;
}
.big-text {
  font-family: "Nanum Gothic", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  /* letter-spacing: 20px; */
  margin-bottom: -30px;
}
.abs-cent-text {
  position: absolute;
  width: 90%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
/* .search{
  margin-top: 0;
  margin-bottom: 0;
  
} */
@media (min-width: 1801px) and (max-width: 2649px) {
  .top-section {
    height: 38vh;
  }
}
</style>
