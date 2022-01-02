import Vue from "vue";
import Router from "vue-router";
import Board from "@/components/Board";
import ContentDetatil from "@/components/ContentDetail";
import Create from "@/components/Create";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import Detail3 from "@/components/Detail3";
import LocationDetail from "@/components/LocationDetail";
import Mypage from "@/components/Mypage";
import OauthRedirect from "@/components/oauth/Redirect";
import IndexPage from "@/components/Index";
import Logout from "@/components/Logout";
import store from "../store/index";

Vue.use(Router);

// vuex 토큰 없을시 라우터 접근 금지
const requireAuth = () => (to, from, next) => {
  if (store.state.account.token != null) {
    return next();
  }
  next("/login");
};

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  mode: "history",
  component: IndexPage,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/board/free",
      name: "Board",
      component: Board,
      beforeEnter: requireAuth()
    },
    {
      path: "/detail3",
      name: "Detail3",
      component: Detail3
    },
    {
      path: "/board/free/detail/:contentNo",
      name: "ContentDetail",
      component: ContentDetatil,
      beforeEnter: requireAuth()
    },
    {
      path: "/board/free/create/:contentNo?",
      name: "Create",
      component: Create,
      beforeEnter: requireAuth()
    },
    {
      path: "/detail3/locationdetail", // /:locaNo
      name: "LocationDetail",
      component: LocationDetail
    },
    {
      path: "/mypage",
      name: "Mypage",
      component: Mypage,
      beforeEnter: requireAuth()
    },
    {
      path: "/oauth/redirect",
      name: "OauthRedirect",
      component: OauthRedirect
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    }
  ]
});
