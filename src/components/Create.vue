<template>
  <div class="create-all">
    <div class="content-detail-create-header">
      글 작성하기
    </div>
    <b-container class="content-detail-create-info">
      <b-input v-model="subject" placeholder="제목을 입력해 주세요"></b-input>
    </b-container>

    <b-container class="content-detail-create-content">
      <b-form-textarea
        size="lg"
        v-model="context"
        placeholder="내용을 입력해 주세요"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-container>
    <!-- 업데이트모드가 true면 content update 하고 false면 그냥 새걸로 upload -->
    <br />
    <br />
    <b-button
      class="btn-c"
      variant="primary"
      @click="updateMode ? updateContent() : uploadContent()"
      >저장</b-button
    >
    <b-button class="btn-c" @click="updateMode ? cancle2() : cancle()"
      >취소</b-button
    >
  </div>
</template>

<script>
import data from "@/data";
import { addContent, modifyContent, findContent } from "../service";
export default {
  name: "Create",
  data() {
    return {
      subject: "",
      context: "",
      userNo: this.$store.state.account.user.userId,
      regdate: "",
      content_no: Number(this.$route.params.contentNo),
      updateMode: this.$route.params.contentNo > 0 ? true : false
    };
  },
  async created() {
    if (this.$route.params.contentNo > 0) {
      // contentno가 존재하면 전에 있던것들을 불러오기
      const ret = await findContent({
        content_no: Number(this.$route.params.contentNo)
      });
      const { data } = ret;
      this.subject = data.title;
      this.context = data.context;
      this.regdate = data.regdate;
    }
  },
  methods: {
    async uploadContent() {
      // 역순으로 하게 만드는게 items
      let items = data.Content.sort((a, b) => {
        return b.content_no - a.content_no;
      });
      // 제일 최신것이 items 배열 첫번째보다 1씩 오른것 -> 글번호 자동으로 1씩 증가
      const content_no = items[0].content_no + 1;
      await addContent({
        user_no: this.userNo,
        title: this.subject,
        context: this.context,
        regdate: this.regdate
      });
      this.$router.push({
        path: "/board/free/"
      });
    },
    async updateContent() {
      await modifyContent({
        title: this.subject,
        context: this.context,
        content_no: Number(this.$route.params.contentNo)
      });
      this.$router.push({
        path: "/board/free/"
      });
    },
    cancle() {
      this.$router.push({
        path: "/board/free/"
      });
    },
    cancle2() {
      this.$router.push({
        path: `/board/free/detail/${this.content_no}`
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.create-all {
  width: 1000px;
  margin: 0px auto;
  margin-bottom: 30px;
}
.content-detail-create-header {
  border: 1px solid rgb(236, 236, 236);
  background-color: #7bc4c4;
  font-weight: 600;
  padding: 0.4rem;
  width: 975px;
  display: inline-block;
  text-align: center;
  margin-top: 180px;
}
.content-detail-create-info {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 45px;
}
.content-detail-create-content {
  min-height: 10px;
}
.btn-c {
  margin-bottom: 15px;
}
</style>
