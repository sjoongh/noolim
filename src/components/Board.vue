<template>
  <div>
    <b-container>
      <!-- fields 속성을 사용해서 보여주고 싶은 컬럼만 사용 가능! -->
      <div class="boardName">고객센터</div>
      <b-table
        class="board"
        hover
        :per-page="perPage"
        :current-page="currentPage"
        :items="items"
        :fields="fields"
        @row-clicked="rowClick"
      >
      </b-table>
    </b-container>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
    ></b-pagination>

    <b-button variant="outline-primary" @click="writeContent">글쓰기</b-button>
  </div>
</template>

<script>
import { findContentList } from "../service";

export default {
  name: "Board",
  async created() {
    const ret = await findContentList();
    this.items = ret.data;
  },
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      fields: [
        {
          key: "content_no",
          label: "글번호"
        },
        {
          key: "title",
          label: "제목"
        },
        {
          key: "regdate",
          label: "등록일"
        },
        {
          key: "username",
          label: "작성자"
        }
      ],
      items: []
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    rowClick(item, index, e) {
      this.$router.push({
        path: `/board/free/detail/${item.content_no}`
      });
    },
    writeContent() {
      this.$router.push({
        path: "/board/free/create"
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.board {
  margin-top: 20px;
}
.boardName {
  text-align: left;
  font-weight: bold;
  font-size: 35px;
  margin-bottom: 40px;
  padding-top: 100px;
  text-align: center;
  color: rgb(124, 124, 124);
}
</style>
