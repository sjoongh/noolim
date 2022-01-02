import Vue from "vue";
import Vuex from "vuex";
import { findHashName, selectHashName } from "./service";

Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production'

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
    // ret: state => {
    //     return state.ret
    // }
    // sibal(state){
    //     return state.ret;
    // }
    // choiceSearch(state){
    //     console.log(state)
    //     return state.ret;
    // }
  },
  // 새 함수click 이벤트, 얘는 바꿔주기
  actions: {
    async test2({ commit }, state) {
      const result = await findHashName(state.hash_name);
      if (result == true) {
        commit("test2");
      }
    }
    // justtest(test) {
    //     this.hash_name = test
    // }
    // choiceSearch (test) {
    //     this.ret = test
    // }
  }
});
