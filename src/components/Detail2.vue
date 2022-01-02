<template>
  <div class="hashtag">
    <div class="tag-container" v-for="(hash, i) in hashs" :key="i">
      <div class="contents-tag">
        <ul class="area" id="region">
          <li>
            <button
              type="button"
              @click="
                [changeColor(hash.hash_no, $event), changePage(hash.hash_name)]
              "
              :style="
                hash.clicked === true
                  ? { 'background-color': 'black', color: 'white' }
                  : null
              "
            >
              {{ hash.hash_name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <br /><br />
    <div></div>

    <div class="tag-container2" v-for="(hash2, j) in hashs2" :key="'a' + j">
      <div class="contents-tag2">
        <ul class="area2" id="region2">
          <li>
            <button
              type="button"
              @click="
                [
                  changeColor2(hash2.hash_no, $event),
                  changePage3(hash2.hash_name)
                ]
              "
              :style="
                hash2.clicked === 1
                  ? { 'background-color': 'black', color: 'white' }
                  : null
              "
            >
              {{ hash2.hash_name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  findHashList,
  findHashList2,
  selectHashName,
  findLocationList,
  selectheart
} from "../service";
import EventBus from "./EventBus";

export default {
  name: "hashtag",
  data() {
    return {
      hashs2: [
        {
          hash_no: "",
          hash_name: "",
          clicked: 0
        }
      ],
      hashs: [
        {
          hash_no: "",
          hash_name: "",
          clicked: false
        }
      ],
      hashsdata: [],
      hashsdata2: [],
      checkDuple: []
    };
  },
  async created() {
    if (
      this.$route.query.locationhash != null ||
      this.$route.query.searchhash != null
    ) {
      var locationhash = null;
      if (this.$route.query.locationhash != null) {
        locationhash = "#" + this.$route.query.locationhash;
      }
      if (this.$route.query.searchhash != null) {
        locationhash = this.$route.query.searchhash;
      }
      const ret10 = await findHashList({ locationhash });
      for (let i = 0; i < 25; i++) {
        // 해쉬태그 넣을때마다 숫자 바꿔주자..
        if (ret10.data[i].hash_name == locationhash) {
          ret10.data[i].clicked = true;
        }
      }
      // search는 전체 for문
      this.hashs = ret10.data;
    }
    if (
      this.$route.query.locationhash != null ||
      this.$route.query.searchhash != null
    ) {
      locationhash = null;
      if (this.$route.query.locationhash != null) {
        locationhash = "#" + this.$route.query.locationhash;
      }
      if (this.$route.query.searchhash != null) {
        locationhash = this.$route.query.searchhash;
      }
      const ret11 = await findHashList2({ locationhash });
      for (let i = 0; i < 14; i++) {
        // 해쉬태그 넣을때마다 숫자 바꿔주자..
        if (ret11.data[i].hash_name == locationhash) {
          // 검색한 해쉬가 hash2의 이름과 같으면 clicked를 1로 바꿔줌
          ret11.data[i].clicked = 1;
        }
      }
      // search는 전체 for문
      this.hashs2 = ret11.data;
    } else {
      findHashList().then(response => (this.hashs = response.data));
      findHashList2().then(response => (this.hashs2 = response.data));
    }
  },
  methods: {
    changeColor(e) {
      if (this.hashs[e - 1].clicked === true) {
        this.hashs[e - 1].clicked = false;
      } else {
        for (let i = 0; i < 25; i++) {
          this.hashs[i].clicked = false;
        }
        this.hashs[e - 1].clicked = true;
      }
    },
    // 친구끼리 선택되어져있으면 전체 렌더링x
    async changePage(hash_name) {
      var ret2 = {};
      var ret3 = [];
      var cc = [];
      var count = 0;
      var check_hash = 0;
      var check_location = 0;
      var check_locationname = "";
      var check_hashname = [];
      var justcount = [];
      var countcheck = [];

      for (let i = 0; i < 25; i++) {
        if (this.hashs[i].clicked == true) {
          count += 1;
        }
      }
      for (let j = 0; j < this.hashs2.length; j++) {
        if (this.hashs2[j].clicked == 1) {
          check_hashname.push(this.hashs2[j].hash_name); // 가족끼리 담음
          check_hash += 1;
        }
      }
      // 1. 가족끼리 선택 후  지역을 선택했을경우(지역만 load됨 -> 교집합)
      // 2. 지역 해제했을경우(전체렌더링 됨 -> 가족끼리만 나오게)
      if (check_hash > 0) {
        for (let k = 0; k < this.hashs.length; k++) {
          // 지역이 클릭되었는지 구분
          if (this.hashs[k].clicked == true) {
            check_locationname = this.hashs[k].hash_name;
            check_location += 1;
          }
        }
        if (check_location > 0) {
          // 지역과 가족끼리가 선택된 상태
          hash_name = check_locationname;
          ret2 = await selectHashName({ hash_name });
          for (let l = 0; l < ret2.data.length; l++) {
            var splitdata2 = ret2.data[l].hash_name.split(" ");
            for (let m = 0; m < splitdata2.length; m++) {
              for (let n = 0; n < check_hashname.length; n++) {
                if (splitdata2[m] == check_hashname[n]) {
                  ret3.push(ret2.data[l]);
                  console.log(ret3);
                }
              }
            }
          }
          ret2 = ret3;
        } else if (check_location == 0) {
          // 지역 클릭했다 클릭해제한 상태
          for (let o = 0; o < check_hashname.length; o++) {
            hash_name = check_hashname[o];
            cc.push(await selectHashName({ hash_name }));
          }
          for (let f = 0; f < this.hashs2.length; f++) {
            if (this.hashs2[f].clicked == 1) {
              countcheck.push(this.hashs2[f].hash_name);
            }
          }

          if (countcheck != null) {
            this.hashsdata2 = [];
            for (let i = 0; i < countcheck.length; i++) {
              hash_name = countcheck[i];
              console.log(hash_name);
              justcount = await selectHashName({ hash_name });
              for (let m = 0; m < justcount.data.length; m++) {
                this.hashsdata2.push(justcount.data[m]);
              }
            }
          }
          if (justcount.length != 0) {
            ret3 = [...new Set(this.hashsdata2.map(JSON.stringify))].map(
              JSON.parse
            );
            ret2 = ret3;
            console.log(ret2);
          }
        }
        // 지역은 클릭해제된 상태, 가족끼리는 선택된 상태 -> else if문 사용
      }
      // 3. 지역x, 가족끼리x 상태
      if (count == 0 && check_hash == 0) {
        ret2 = await findLocationList();
      } else if (count == 1 && check_hash == 0) {
        // 4. 지역만 선택되었을경우
        ret2 = await selectHashName({ hash_name });
      }

      if (ret3.length != 0) {
        var test1 = new Set(ret2);
        ret2 = [...test1];
        this.hashsdata = ret2;
        if (this.$store.state.account.user != null) {
          var user = this.$store.state.account.user.userId;
          var clickheart = await selectheart({ user });
          for (let i = 0; i < ret2.length; i++) {
            for (let j = 0; j < clickheart.data.length; j++) {
              if (ret2[i].title == clickheart.data[j].title) {
                ret2[i].liked = true;
                ret2[i].like_color = "red";
              }
            }
          }
        }
        EventBus.$emit("changePage", ret2);
      } else if (ret3.length == 0) {
        var test2 = new Set(ret2.data);
        ret2.data = [...test2];
        this.hashsdata = ret2.data;
        if (this.$store.state.account.user != null) {
          var user = this.$store.state.account.user.userId;
          var clickheart2 = await selectheart({ user });
          console.log(clickheart2.data.length);
          for (let i = 0; i < ret2.data.length; i++) {
            for (let j = 0; j < clickheart2.data.length; j++) {
              if (ret2.data[i].title == clickheart2.data[j].title) {
                ret2.data[i].liked = true;
                ret2.data[i].like_color = "red";
              }
            }
          }
        }
        EventBus.$emit("changePage", ret2.data);
      }
    },

    async changePage3(hash_name) {
      var ret3 = [];
      var splitdata2 = [];
      var count = 0;
      var check_name = [];
      var check_name2 = [];
      var qureycheck_name = [];
      var count_click = 0;
      var count_click2 = 0;
      var check2 = [];
      var check = [];
      var check_hashs2 = 0;

      var ret2 = await selectHashName({ hash_name }); // 가족끼리 데이터 가져옴
      // hashsdata --> 지역해시태그 정보 담고있음
      // hashs2 --> 친구끼리, 가족끼리 등등 해시태그
      for (let i = 0; i < 25; i++) {
        // 클릭 검증
        if (this.hashs[i].clicked == true) {
          // hashsdata에는 정보가 있는 상태니까 hashs에 데이터가 있는지 없는지만 확인 --> 강남구랑 hash_name이랑 비교
          count += 1;
        }
      }
      // 지역 클릭 안된상태
      if (count == 0 && this.hashsdata2 != null) {
        // 0. 지역과 중복태그가 전부 null값인지 판단
        // 1. click된 값만 데이터를 가지고 있어야 하고 push값도 초기화
        for (let i = 0; i < this.hashs2.length; i++) {
          // clicked을 기준으로 잡음, click된 요소가 몇개인지 확인
          if (this.hashs2[i].clicked == true) {
            check_name.push(this.hashs2[i].hash_name);
            count_click += 1;
          }
        }
        console.log(count_click);
        // 클릭된 값이 0보다 클경우 무조건 들어옴
        if (count_click > 0) {
          // null 값이면 그냥 넣어줌 딱 한번만 들어옴
          console.log(this.hashsdata2);
          if (this.hashsdata2.length == 0) {
            for (let l = 0; l < ret2.data.length; l++) {
              this.hashsdata2.push(ret2.data[l]);
              var cs = this.hashsdata2;
              ret3 = cs;
            }
          } else {
            // null값 이후의 중복태그 클릭
            this.hashsdata2 = [];
            var cs = [];
            for (let k = 0; k < check_name.length; k++) {
              hash_name = check_name[k]; // 클릭되어있는 해시태그들
              console.log(hash_name);
              var ret7 = await selectHashName({ hash_name }); // 전부 가져옴 데이터
              for (let m = 0; m < ret7.data.length; m++) {
                this.hashsdata2.push(ret7.data[m]);
              }
            }
            // Set을 통해 중복 제거
            ret3 = [...new Set(this.hashsdata2.map(JSON.stringify))].map(
              JSON.parse
            );
          }
        } else {
          // TODO: 되돌리기, 전체 렌더링 안됨
          this.hashsdata2 = [];
          for (let i = 0; i < 25; i++) {
            if (this.hashs[i].clicked == true) {
              count_click2 += 1;
            }
          }
          if (count_click2 == 0) {
            var aa = await findLocationList();
            ret3 = aa.data;
          } else if (count_click2 != 0) {
            // 지역 선택되어져 있으면 지역 데이터 렌더링 시키고
            ret3 = this.hashsdata;
          }
        }
      }
      // 지역 클릭된상태
      else if (count == 1) {
        for (let k = 0; k < this.hashs2.length; k++) {
          // clicked을 기준으로 잡음, click된 요소가 몇개인지 확인
          if (this.hashs2[k].clicked == true) {
            count_click += 1;
          }
        }
        // 친구끼리 선택x
        if (count_click == 0) {
          for (let l = 0; l < this.hashs.length; l++) {
            if (this.hashs[l].clicked == true) {
              hash_name = this.hashs[l].hash_name;
              var bb = await selectHashName({ hash_name });
              ret3 = bb.data;
            }
          }
          // 친구끼리 선택o
        } else if (count_click >= 1) {
          // search나 지도로 들어왔을경우
          if (
            this.$route.query.locationhash != null ||
            this.$route.query.searchhash != null
          ) {
            for (let a = 0; a < this.hashs2.length; a++) {
              if (this.hashs2[a].clicked == 1) {
                qureycheck_name.push(this.hashs2[a].hash_name);
              }
            }
            // hashs2의 데이터가 하나이상 선택되어있는 경우이므로 this.hashsdata2에 저장시켜놓고 새로운 데이터 들어올때마다 초기화 및 넣어주면될듯
            console.log(qureycheck_name); // 가족끼리와 힐링 출력
            console.log(this.$route.query.hash_name); // 처음에 선택한 가족끼리만 들어옴
            for (let b = 0; b < this.$route.query.hash_name.length; b++) {
              var test = this.$route.query.hash_name[b].hash_name.split(" ");
              for (let c = 0; c < test.length; c++) {
                this.hashsdata2.push(ret2.data[c]);
                for (let d = 0; d < qureycheck_name.length; d++) {
                  if (test[c] == qureycheck_name[d]) {
                    check.push(this.$route.query.hash_name[b]);
                  }
                }
              }
            }
            var connect = new Set(check);
            var commondata = [...connect];
            for (let z = 0; z < commondata.length; z++) {
              ret3.push(commondata[z]);
            }
            // search나 지도가 아닌 detail페이지에서 동작
          } else {
            for (let t = 0; t < this.hashs2.length; t++) {
              if (this.hashs2[t].clicked == 1) {
                check_name2.push(this.hashs2[t].hash_name); // hashs2의 클릭된 hash_name
              }
            }
            // check_name2 = hashs2의 hash_name
            // this.hashsdata = #강남구 데이터 --> loca_no, title, hash_name
            for (let i = 0; i < this.hashsdata.length; i++) {
              var splitdata2 = this.hashsdata[i].hash_name.split(" ");
              // #가족끼리가 있는지 확인하는 반복문
              // splitdata로 hashsdata안에 클릭한 hash_name이 존재하는지 판단
              for (let j = 0; j < splitdata2.length; j++) {
                this.hashsdata2.push(ret2.data[i]);
                for (let r = 0; r < check_name2.length; r++) {
                  if (splitdata2[j] == check_name2[r]) {
                    // 클릭된값과 같은해시네임이 존재한다면
                    check.push(this.hashsdata[i]);
                  }
                }
              }
            }
            var connect = new Set(check);
            var commondata = [...connect];
            for (let z = 0; z < commondata.length; z++) {
              ret3.push(commondata[z]);
            }
          }
        }
      }
      if (this.$store.state.account.user != null) {
        var user = this.$store.state.account.user.userId;
        var clickheart3 = await selectheart({ user });
        for (let i = 0; i < ret3.length; i++) {
          for (let j = 0; j < clickheart3.data.length; j++) {
            if (ret3[i].title == clickheart3.data[j].title) {
              ret3[i].liked = true;
              ret3[i].like_color = "red";
            }
          }
        }
      }
      EventBus.$emit("changePage3", ret3);
    },

    changeColor2(e) {
      var e2 = 0;
      e2 = e - 26; // 해쉬태그 넣을때마다 고치기
      if (this.hashs2[e2].clicked == 0) {
        this.hashs2[e2].clicked = 1;
      } else {
        this.hashs2[e2].clicked = 0;
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
.hashtag {
  background-color: rgb(243, 243, 243);
  border-radius: 10px;
  padding: 8px;
  /* display: block; */
  /* -webkit-box-pack: end; */
  /* -ms-flex-pack: end; */
  /* justify-content: flex-end; */
  position: absolute;
  left: 1100px;
  top: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;

  max-width: 100%;
  max-height: 100%;
}
.hashtag li button {
  padding: 7px 3px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  border: none;
  width: 80px;
}
ul {
  display: block;
  padding: 0;
  margin: 0;
  font-size: 13px;
}
li {
  list-style: none;
  /* margin: 0 auto; */
}
button {
  border: 0 none;
  cursor: pointer;
  background-color: rgb(243, 243, 243);
  display: block;
  font-weight: bold;
}
button:hover {
  color: #ffffff;
  background-color: #7bc4c4;
}
/* .line3{
  border: 1px solid rgb(207, 207, 207);
  
} */
@media (min-width: 1801px) and (max-width: 2649px) {
  .hashtag {
    left: 1550px;
    top: 450px;
  }
}
@media (max-width: 1800px) {
  .hashtag {
    left: 1200px;
    top: 380px;
  }
}
</style>
