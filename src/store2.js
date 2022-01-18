import Vue from "vue";
import Vuex from "vuex";
import { findHashName, selectHashName } from "./service";

Vue.use(Vuex);

// 인피니트 핸들러를 위한 vuex
export const store = new Vuex.Store({
  state: {
    hash_name: "",
    ret2: {},
    limit: 0
  },
  mutations: {
    hash(state, ret2) {
      state.ret = ret2;
    }
  },
  getters: {
    justtest(state) {
      return state.ret2;
    }
  },
  // 새 함수click 이벤트
  actions: {
    async test2({ commit }, state) {
      const result = await findHashName(state.hash_name);
      if (result == true) {
        commit("test2");
      }
    }
  }
});
