<template>
  <div class="wrap">
    <div
      id="app"
      v-on:keyup.down="selectValue('down')"
      v-on:keyup.up="selectValue('up')"
    >
      <div class="search">
        <input
          type="text"
          class="s"
          placeholder="'#'을 입력해보세요!"
          v-on:input="searchQuery = $event.target.value"
          @keyup.enter="onSubmit($event.target.value)"
        />
        <button type="submit" class="search_searchButton" @click="getSearch()">
          <img src="../assets/search2.jpg" alt="search" />
        </button>
        <ul class="r" tabindex="0" v-bind:class="{ show: isActive }">
          <li
            tabindex="-1"
            v-for="(el, index) in filterList"
            :key="index"
            v-on:click="changeValue(el.name)"
            v-on:keyup.enter="selectValue('enter', el.name)"
          >
            <span>{{ el.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { selectHashName } from "../service";
var names = [
  { name: "#강남구" },
  { name: "#도봉구" },
  { name: "#동대문구" },
  { name: "#동작구" },
  { name: "#마포구" },
  { name: "#서대문구" },
  { name: "#서초구" },
  { name: "#성동구" },
  { name: "#성북구" },
  { name: "#송파구" },
  { name: "#양천구" },
  { name: "#강동구" },
  { name: "#영등포구" },
  { name: "#용산구" },
  { name: "#은평구" },
  { name: "#종로구" },
  { name: "#중구" },
  { name: "#중랑구" },
  { name: "#강북구" },
  { name: "#강서구" },
  { name: "#관악구" },
  { name: "#광진구" },
  { name: "#구로구" },
  { name: "#금천구" },
  { name: "#노원구" },
  { name: "#가족끼리" },
  { name: "#힐링" },
  { name: "#데이트코스" },
  { name: "#카페투어" },
  { name: "#가볼만한곳" },
  { name: "#기념일" },
  { name: "#나홀로" },
  { name: "#전통한옥" },
  { name: "#전시관" },
  { name: "#인스타감성" },
  { name: "#혼술" },
  { name: "#오늘뭐먹지" },
  { name: "#이색체험" }
];
export default {
  data() {
    return {
      isActive: false,
      searchQuery: "",
      names: names
    };
  },
  methods: {
    async onSubmit(hash_name) {
      // hashname은 #이 안 붙어서 검색할수도있음(사용자가)
      // 조건문으로 #이 없다면 넣어줌
      if (hash_name.indexOf("#") == -1) {
        hash_name = "#".concat(hash_name);
      }
      var searchhash = hash_name;
      const ret3 = await selectHashName({ hash_name });
      this.$router.push({
        name: "Detail3",
        query: {
          hash_name: ret3.data,
          searchhash: searchhash
        }
      });
    },
    async getSearch() {
      var hash_name = document.querySelector(".s").value;
      this.onSubmit(hash_name);
      console.log(hash_name);
    },
    changeValue(str) {
      console.log(`change value: ${str}`);

      this.isActive = false;
      this.searchQuery = "";
      document.querySelector(".s").value = str;
    },
    selectValue(keycode, str) {
      if (this.isActive === true) {
        const hasClass = document.querySelector(".r").classList.contains("key");
        if (keycode === "down") {
          if (!hasClass) {
            const thisEl = document.querySelectorAll(".r li")[0];
            document.querySelector(".r").classList.add("key");
            thisEl.classList.add("sel");
            thisEl.focus();
          } else {
            const lastEl = document.querySelector(".r li:last-child");
            const thisEl = document.querySelector(".r li.sel");
            const nextEl = thisEl.nextElementSibling;
            if (!lastEl.classList.contains("sel")) {
              thisEl.classList.remove("sel");
              nextEl.classList.add("sel");
              nextEl.focus();
            }
          }
        }
        if (keycode === "up" && hasClass) {
          const firstEl = document.querySelectorAll(".r li")[0];
          const thisEl = document.querySelector(".r li.sel");
          const prevEl = thisEl.previousElementSibling;
          if (!firstEl.classList.contains("sel")) {
            thisEl.classList.remove("sel");
            prevEl.classList.add("sel");
            prevEl.focus();
          } else {
            document.querySelector(".s").focus();
          }
        }
        if (keycode === "enter" && hasClass) {
          this.changeValue(str);
        }
      }
    }
  },
  computed: {
    filterList() {
      const str = this.searchQuery;
      const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|#|\s]/.test(str);
      console.log(`typing value: ${str}`);
      if (reg === false && str !== "" && str !== " ") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isActive = true;
        console.log(this.isActive);
        console.log(2);
        return this.names.filter(el => {
          return el.name.match(str);
        });
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isActive = false;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
html,
body {
  height: 100%;
}
body {
  background-color: #ddd;
  font-size: 14px;
  color: #333;
}
strong {
  font-weight: bold;
}
.wrap {
  display: table;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#app {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
#app .search {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  margin-top: 10px;
}
#app .search .s {
  padding: 10px 20px;
  width: 1000px;
  max-width: 600px;
  height: 40px;
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #888;

  font-size: 16px;
}
#app .search .r {
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  height: 156px;
  overflow-y: auto;
  list-style: none;
  padding-left: 0;
}
#app .search .r.show {
  display: block;
}
#app .search .r li {
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  margin-top: -1px;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-sizing: border-box;

  outline: black;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
  display: flex;
}
#app .search .r li:hover,
#app .search .r li.sel {
  background-color: #7bc4c4;
}
#app .search p {
  padding: 10px 0;
  text-align: right;
  font-size: 12px;
}
.search_searchButton {
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #888;
  border-left: none;
  cursor: pointer;
  font-size: 20px;
  /* position: absolute; */
}
.search_searchButton img {
  width: 20px;
  height: 20px;
  /* position: relative; */
}
.search {
  display: flex;
  height: 40px;
  margin: 0 auto;
  width: 50%;
}
</style>
