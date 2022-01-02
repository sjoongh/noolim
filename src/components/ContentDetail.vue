<template>
  <div class="all-all">
    <br />
    <a class="btn btn-primary" href="/board/free">목록으로</a>
    <b-container>
      <br />
      <b-card class="card-all">
        <div class="content-detail-content-info-header">
          세부내용 보기
        </div>

        <div class="content-detail-content-info">
          <div class="content-detail-content-info-left">
            <div class="content-detail-content-info-left-number">
              {{ contentNo }}
            </div>
          </div>

          <div class="content-detail-content-info-center">
            <div class="content-detail-content-info-center-subject">
              {{ title }}
            </div>
          </div>

          <div class="content-detail-content-info-right">
            <div class="content-detail-content-info-right-user">
              작성자: {{ user }}
            </div>
            <div class="content-detail-content-info-right-regdate">
              등록일: {{ regdate }}
            </div>
          </div>
        </div>

        <div class="content-detail-content">
          {{ context }}
        </div>

        <div class="content-detail-button">
          <b-button
            variant="outline-success"
            @click="dbId == storeId ? updateData() : notCorrectMsg()"
            >수정</b-button
          >
          <b-button
            variant="outline-danger"
            @click="dbId == storeId ? deleteData() : notCorrectMsg()"
            >삭제</b-button
          >
        </div>
        <div class="content-detail-comment">
          <CommentList :contentNo="contentNo" />
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import CommentList from "./CommentList";
import { findContent, deleteContent } from "../service";
export default {
  name: "ContentDetail",
  components: {
    CommentList
  },
  async created() {
    const ret = await findContent({
      content_no: Number(this.$route.params.contentNo)
    });
    const { data } = ret;
    this.title = data.title;
    this.context = data.context;
    this.user = data.username;
    this.regdate = data.regdate;
    this.dbId = data.user_id;
    this.storeId = this.$store.state.account.user.userId;
    // this.comment_no = data.comment_no;
  },
  data() {
    const contentNo = Number(this.$route.params.contentNo);
    return {
      contentNo: contentNo,
      title: "",
      context: "",
      user: "",
      regdate: "",
      dbId: "",
      storeId: ""
      // comment_no : ''
    };
  },
  methods: {
    notCorrectMsg() {
      alert("권한이 존재하지 않습니다.");
    },
    async deleteData() {
      alert("글을 삭제합니다");
      await deleteContent({ content_no: this.contentNo }),
        this.$router.push({
          path: "/board/free"
        });
    },
    async updateData() {
      this.$router.push({
        path: `/board/free/create/${this.contentNo}`
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
.all-all {
  padding-top: 100px;
  padding-bottom: 50px;
}
.card-all {
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 1000px;
  margin: 0px auto;
}
.content-detail-content-info-header {
  border: 1px solid rgb(236, 236, 236);
  background-color: #7bc4c4;
  font-weight: 600;
  padding: 0.4rem;
  margin-bottom: 2px;
}
.content-detail-content-info {
  border: 1px solid rgb(236, 236, 236);
  display: flex;
  justify-content: space-between;
  height: 45px;
  margin-bottom: 2px;
}
.content-detail-content-info-left {
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 12px;
}
.content-detail-content-info-center {
  width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 18px;
  font-weight: 600;
}
.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 11px;
}
.content-detail-content {
  border: 1px solid rgb(236, 236, 236);
  padding-top: 1rem;
  min-height: 300px;
}
.content-detail-button {
  height: 50px;
  padding: 0.3rem;
}
.content-detail-comment {
  margin-top: 1rem;
  padding: 2rem;
}
</style>
