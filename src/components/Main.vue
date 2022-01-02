<template>
  <div class="rela-block top-section grad-back" id="topSection">
    <div class="abs-cent-text top-text">
      <h1 class="big-text">NOOLIM</h1>
      <p class="top-small-text ">인생의 즐거움을 모두 누리자</p>
      <Search />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/Search";
export default {
  name: "Main",
  components: {
    Search
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {},
  computed: {
    //! 검색어에 입력하면 타이틀(내용) 걸러줌 (우리꺼에 맞게 수정하기)
    filteredBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    },
    ...mapGetters(["token", "user"]),
    isLoggedIn() {
      return this.token != null;
    },
    isAdmin() {
      return this.user && this.user.roleType === "ADMIN";
    },
    username() {
      if (!this.user) return "";
      return this.user.username;
    },
    roleType() {
      if (!this.user) return "";
      return this.user.roleType;
    }
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
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1568743295327-cfc48ccc456d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    no-repeat center;
  background-size: cover;
}
/** 메인 이미지 효과*/
.grad-back::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(transparent, rgba(0, 0, 0, 0.3));
}
/** 메인 텍스트 설정 */
.top-text {
  color: #fff;
  top: 58%;
  line-height: 28px;
}
.top-small-text {
  font-size: 17px;
  line-height: 24px;
  letter-spacing: 2px;
  font-weight: 400;
  margin-bottom: 30px;
}
.big-text {
  font-family: "Nanum Gothic", sans-serif;
  text-transform: uppercase;
  font-size: 58px;
  font-weight: bold;
  line-height: 72px;
  letter-spacing: 20px;
  margin-bottom: 10px;
}
.abs-cent-text {
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.section-search input {
  padding: 5px !important;
  font-size: 18px !important;
  width: 50% !important;
  border: #f4f4f4 3px solid !important;
}
.container h3 {
  font-family: "Nanum Gothic", sans-serif;
  font-size: 25px;
  padding: 20px;
}
</style>
