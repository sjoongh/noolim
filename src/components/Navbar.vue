<template>
  <header class="scrolled-nav">
    <nav>
      <div class="nav-logo">
        <router-link to="/">
          <img class="pic" src="../assets/Noolim-logo.png" />
        </router-link>
      </div>
      <ul v-show="!mobile" class="navigation">
        <div v-if="this.$store.state.account.token != null" class="blank">
          안녕하세요 {{ this.$store.state.account.user.username }}님
        </div>
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/detail3">상세 검색</router-link></li>
        <li v-if="this.$store.state.account.token != null">
          <router-link class="link" to="/board/free">고객센터</router-link>
        </li>
        <li v-if="this.$store.state.account.token == null">
          <router-link class="link" to="/login">로그인</router-link>
        </li>
        <li v-if="this.$store.state.account.token != null">
          <router-link class="link" to="/mypage">마이페이지</router-link>
        </li>
        <li v-if="this.$store.state.account.token != null">
          <router-link class="link" to="/logout">로그아웃</router-link>
        </li>
      </ul>
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>

      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: '' }"
              >Popular Places</router-link
            >
          </li>
          <li>
            <router-link class="link" :to="{ name: '' }">Location</router-link>
          </li>
          <li>
            <router-link class="link" to="/board/free">고객센터</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: '' }">로그인</router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        // this.scrolledNav = true;
        return;
      }
      // this.scrolledNav = false;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.blank {
  margin: 0 20% 0 30%;
  font-size: 18px;
  /* background-color: black; */
}
nav {
  padding: 10px 0;
  background-color: #7bc4c4;
  z-index: 99;
  color: #fff;

  align-items: center;
  width: 100%;
  justify-content: flex-end;
  position: fixed;
  /* 아니 고정하면 다른 div가 가려짐;;; */
}
nav {
  width: 100%;
  transition: 0.5s ease all;
  margin: 0 auto;
  flex-direction: row;
}
ul,
.link {
  font-weight: 500;
  color: #fff;
  list-style: none;
  text-decoration: none;
  /* 로고 전체 클릭할려면 position 없어야 함 */
  /* position: relative; */
}
li {
  text-transform: uppercase;
  padding: 16px;
  margin-left: 16px;
}
.link {
  font-size: 14px;
  transition: 0.5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}
.link.active,
.link:hover {
  color: rgb(255, 255, 255);
}
.nav-logo {
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
  letter-spacing: 0px;
  color: #fff;
  transition: 0.4s ease;
  cursor: pointer;
}
.nav-logo img {
  width: 170px;
  left: 10px;
  cursor: pointer;
}
.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}
.icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 24px;
  height: 100%;
}
i {
  cursor: pointer;
  font-size: 24px;
  transition: 0.8s ease all;
}
.icon-active {
  transform: rotate(180deg);
}
.dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
}
li {
  margin-left: 0;
}
.link {
  color: rgb(138, 138, 138);
}
.scrolled-nav {
  background-color: #7bc4c4;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
nav {
  padding: 10px 0;
}
</style>
