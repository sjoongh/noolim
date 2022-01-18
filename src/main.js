import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App";
import router from "./router";
import store from "./store";
import naver from "vue-naver-maps";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
// 모든 요청에 적용될 기본 구성(Config Defaults)값을 지정
// 글로벌 axios 기본(defaults) 설정
// vue.js의 서버에서 모든 axios요청이 요구되므로 고정 URL로 설정
// 즉 매번 axios 요청시마다 URL을 (헤더를)고정적으로 설정한다.
axios.defaults.baseURL =
  "http://ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080";

// NAVER 지도 API 설정
require("dotenv").config();
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(naver, {
  clientID: process.env.NAVER_MAP_ID, // client
  key: process.env.NAVER_MAP_KEY,
  useGovAPI: false, // 공공클라우드 API
  subModules: "" // 서브 모듈
});

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
