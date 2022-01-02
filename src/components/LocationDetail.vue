<template>
  <div class="test">
    <div>
      <div class="test-title">
        <h1>{{ title }}</h1>
        <p>{{ context1 }}</p>
      </div>

      <div class="line"></div>
      <div class="contents-Detail">
        <img
          v-if="picture2 != ''"
          class="test"
          :src="picture2"
          height="500"
          width="800"
        />
        <div class="textall">{{ context2 }}</div>
        <img
          v-if="picture3 != ''"
          class="test"
          :src="picture3"
          height="500"
          width="800"
        />
        <div class="textall">{{ context3 }}</div>
        <img
          v-if="picture4 != ''"
          class="test"
          :src="picture4"
          height="500"
          width="800"
        />
        <div class="textall">{{ context4 }}</div>
        <img
          v-if="picture5 != ''"
          class="test"
          :src="picture5"
          height="500"
          width="800"
        />
        <div class="textall">{{ context5 }}</div>
        <img
          v-if="picture6 != ''"
          class="test"
          :src="picture6"
          height="500"
          width="800"
        />
        <div class="textall">{{ context6 }}</div>
      </div>
      <div class="line"></div>
      <div>
        <naver-maps
          :height="height"
          :width="width"
          :mapOptions="mapOptions"
          :initLayers="initLayers"
          v-if="this.mapOptions.lat != 0"
          @load="onLoad"
        >
          <naver-info-window
            class="info-window"
            @load="onWindowLoad"
            :isOpen="info"
            :marker="marker"
          >
            <div class="info-window-container">
              <!-- 마크 안에 정보 들어가는 곳 -->
              <!-- 데이터가 null값인것도 생각해서 꾸며주기 ㅎㅎ.. -->
              <h1>{{ mapdata.map_name }}</h1>
              <h2>{{ mapdata.map_address }}</h2>
              <p>{{ mapdata.map_tel }}</p>
              <p>{{ mapdata.map_page }}</p>
              <p>{{ mapdata.map_time }}</p>
            </div>
          </naver-info-window>
          <naver-marker
            :lat="this.mapOptions.lat"
            :lng="this.mapOptions.lng"
            @click="onMarkerClicked"
            @load="onMarkerLoaded"
          />
          <naver-ground-overlay
            :bounds="{ south: 36.7, north: 36.9, west: 126.5, east: 127.5 }"
          />
        </naver-maps>
        <p class="marker-notice">📍마커 클릭시 자세한정보가 나옵니다</p>
      </div>

      <div class="map-info">
        <h4>📌 위치 정보</h4>
        <li>주소 : {{ mapdata.map_address }}</li>
        <li>전화번호 : {{ mapdata.map_tel }}</li>
        <li>홈페이지 : {{ mapdata.map_page }}</li>
        <li>영업시간 : {{ mapdata.map_time }}</li>
      </div>
      <br />
      <br />
    </div>
    <!-- <div class="line"></div> -->
    <div class="text7">
      <h4>📋 추가 정보</h4>
      {{ context7 }}<br />
    </div>
    <br />
    <br />
    <div class="line2"></div>

    <div class="content-detail-comment">
      <LocationCommentList
        v-if="this.$store.state.account.user != null"
        :locaNo="locaNo"
      />
    </div>
  </div>
</template>

<script>
import { findLocation, findMap } from "../service";
import LocationCommentList from "./LocationCommentList";

export default {
  name: "LocationDetail",
  components: {
    LocationCommentList
  },
  async created() {
    const ret2 = await findMap({ title: this.$route.query.title });
    // 넣어야할 데이터들
    this.mapdata = ret2.data[0];
    this.mapOptions.lat = Number(ret2.data[0].lat);
    this.mapOptions.lng = Number(ret2.data[0].lng);
    console.log(Number(ret2.data[0].lat));
    const ret = await findLocation({
      loca_no: Number(this.$route.query.loca_no)
    });
    const { data } = ret;
    this.title = data.title;
    this.picture1 = data.picture1;
    this.picture2 = data.picture2;
    this.picture3 = data.picture3;
    this.picture4 = data.picture4;
    this.picture5 = data.picture5;
    this.context1 = data.context1;
    this.context2 = data.context2;
    this.context3 = data.context3;
    this.context4 = data.context4;
    this.context5 = data.context5;
    this.picture6 = data.picture6;
    this.context6 = data.context6;
    this.context7 = data.context7;
    this.tag = data.tag;
  },
  data() {
    const locaNo = Number(this.$route.query.loca_no);
    return {
      width: 800,
      height: 400,
      info: false,
      marker: null,
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 0,
        lng: 0,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: { position: "TOP_RIGHT" },
        mapTypeControl: true
      },
      initLayers: [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        "CHINESE",
        "JAPANESE"
      ],
      locaNo: locaNo,
      title: "",
      picture1: "",
      picture2: "",
      picture3: "",
      picture4: "",
      picture5: "",
      context1: "",
      context2: "",
      context3: "",
      context4: "",
      context5: "",
      picture6: "",
      context6: "",
      context7: "",
      tag: "",
      mapdata: []
    };
  },
  computed: {
    markclick() {
      return this.mapdata;
    }
  },
  mounted() {
    setInterval(() => this.count++, 1000);
  },
  methods: {
    onLoad(vue) {
      this.map = vue;
      console.log(this.mapOptions.lng);
    },
    onWindowLoad(that) {},
    onMarkerClicked(event) {
      this.info = !this.info;
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
#vue-naver-maps {
  margin: 0 auto; /* 가운데 정렬 */
}
/* 글씨 */
.info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
}
.info-window-container h1 {
  font-size: 15px;
  font-weight: bold;
}
.info-window-container h2 {
  font-size: 10px;
  padding-bottom: 2px;
}
.info-window-container p,
a {
  margin: 0;
  font-size: 10px;
}
/* 하얀색 박스???? 없어도 될듯?*/
/* .info-window { 
    width: 500px;
    height: 100px;
} */
.test-title h1 {
  padding-top: 130px;
  box-shadow: inset 0 -20px 0 #96dddd;
  width: 30%;
  margin: 0 auto; /* 가운데 정렬 */
}
.test-title h4 {
  font-size: 20px;
  padding-top: 10px;
  color: #777;
}
.test-title {
  padding-bottom: 70px;
}
.contents3 h2 {
  padding: 100px;
  padding-bottom: 20px;
}
.test-taglist {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  padding: 0;
  z-index: 1;
  display: block;
  padding-bottom: 10px;
  left: 380px;
}
.test-taglist ul {
  padding: 15px 0 0 15px;
  list-style: none;
}
.test-taglist ul li {
  float: left;
  width: auto;
  padding: 5px;
}
.test-taglist ul li a:hover {
  color: #ffffff;
  background-color: #7bc4c4;
}
.test-taglist ul li a span {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
}
.test-taglist ul li a {
  display: inline-block;
  overflow: hidden;
  background: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #777;
  border: 1px solid #d8d7d7;
  border-radius: 7px;
}
a:link {
  text-decoration: none;
}
.line {
  border-top: 1px solid #e9ecef;
  height: 20px;
  /* background:rgb(187, 187, 187);
    padding-bottom: 50px;
    margin-bottom: 10px;  */
  width: 70%;
  margin: 0 auto; /* 가운데 정렬 */
}
.marker-notice {
  padding: 15px;
  font-size: 13px;
  font-weight: bold;
}
.content-detail-comment {
  /* border: 1px solid black; */
  margin-top: 1rem;
  padding: 2rem;
  margin-left: 350px;
  margin-right: 300px;
}
.contents-Detail {
  padding-top: 10px;
}
.textall {
  font-size: 15xpx;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 510px;
  margin: 0 auto; /* 가운데 정렬 */
}
/* 추가 정보 */
.map-info {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  background-color: #fafafa;
  padding: 20px;
  color: black;
  text-align: left;
  /* margin-top: 20px;
  margin-left:100px; 
  margin-right:100px;  */
  width: 1070px;
  margin: 0 auto; /* 가운데 정렬 */
  height: 150px;
}
.text7 {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  background-color: #fafafa;
  padding: 20px;
  color: black;
  text-align: left;
  /* margin-top: 20px;
  margin-left:100px; 
  margin-right:100px;  */
  width: 1070px;
  margin: 0 auto; /* 가운데 정렬 */
  height: 120px;
}
.text7 h4 {
  font-size: 18px;
  font-weight: bold;
}
.map-info h4 {
  font-size: 18px;
  font-weight: bold;
}
.map-info li {
  float: left;
  width: 50%;
  padding: 0 0 9px 0;
}
.line2 {
  border-top: 1px solid #e9ecef;
}
@media (min-width: 1650px) {
  .contents-Detail img {
    height: 600px;
    width: 1100px;
  }
  .textall {
    font-size: 20px;
    width: 1000px;
  }
}
</style>
