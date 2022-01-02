<template>
  <div>
    <!-- 수정누르면 템플릿 보였다 안보였다하게 -->
    <template v-if="disappear">
      <div class="comment-list-item">
        <div class="img"></div>

        <div class="comment-list-item-name">
          <div class="name-name">{{ commentObj.username }}</div>
          <div class="comment-list-item-time">{{ commentObj.regdate }}</div>
          <div class="comment-list-item-context">{{ commentObj.context }}</div>
        </div>

        <div class="comment-list-item-button">
          <b-button
            size="sm"
            class="btn1"
            variant="outline-success"
            @click="dbId == storeId ? modifyCoData() : notCorrectMsg()"
            >수정</b-button
          >
          <b-button
            size="sm"
            class="btn2"
            variant="outline-danger"
            @click="dbId == storeId ? deleteCoData() : notCorrectMsg()"
            >삭제</b-button
          >
          <!-- <b-button variant="info" @click="subCommentToggle">대댓글 달기</b-button> -->
        </div>
      </div>

      <!-- 대댓글 기능 안넣을거 같아서 주석처리 -->
      <!-- <template v-if="subCommentCreateToggle">
      <CommentCreate
        :isSubComment="true"
        :commentNo="commentObj.comment_no"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
      />
    </template> -->

      <!-- <template v-if="subCommentList.length > 0">
      <div
        class="comment-list-item-subcomment-list"
        :key="item.subcomment_no"
        v-for="item in subCommentList"
      >
        <div class="comment-list-item-name">
          <div>{{item.user_name}}</div>
          <div>{{item.regdate}}</div>
        </div>
        <div class="comment-list-item-context">{{item.context}}</div>
        <div class="comment-list-item-button">
          <b-button variant="info">수정</b-button>
          <b-button variant="info"  @click="deleteScData">삭제</b-button>
        </div>
      </div>
    </template> -->
    </template>

    <template v-if="!disappear">
      <div class="comment-create">
        <b-input-group :prepend="name" class="mt-3">
          <b-form-textarea
            id="textarea"
            v-model="context"
            rows="3"
            max-rows="6"
            >{{ context }}</b-form-textarea
          >
          <b-input-group-append>
            <b-button
              class="writeBtn"
              variant="outline-primary"
              @click="[modifyCoData(), modifyCoData2()]"
              >수정하기</b-button
            >
            <b-button
              class="writeBtn"
              variant="outline-danger"
              @click="cancleModify"
              >취소</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </template>
  </div>
</template>

<script>
import LocationCommentCreate from "./LocationCommentCreate";
import {
  findSubComment,
  deleteLocationComment,
  deleteSubComment,
  modifyLocationComment,
  addLocationComment
} from "../service";

export default {
  name: "LocationCommentListItem",
  props: {
    commentObj: Object
  },
  components: {
    LocationCommentCreate
  },

  // async created(){
  //   const ret = await findSubComment({comment_no});
  //   this.subCommentList = ret.data;
  // },
  data() {
    return {
      // name: data.User.filter(
      //   item => item.user_no === this.commentObj.user_no
      // )[0].name,
      name: this.$store.state.account.user.username,
      subCommentList: [],
      subCommentCreateToggle: false,
      modifyCreateToggle: false,
      disappear: true,
      context: `${this.commentObj.context}`,
      dbId: `${this.commentObj.user_id}`,
      storeId: `${this.$store.state.account.user.userId}`
    };
  },
  methods: {
    notCorrectMsg() {
      alert("권한이 존재하지 않습니다.");
    },
    // subCommentToggle() {
    //   this.subCommentCreateToggle = !this.subCommentCreateToggle;
    // },
    // async reloadSubComments() {
    //   const ret = await findSubComment({comment_no: this.commentObj.comment_no});
    //   this.subCommentList = ret.data;
    // },
    async deleteCoData() {
      alert("댓글을 삭제합니다");
      await deleteLocationComment({ comment_no: this.commentObj.comment_no });
      this.$router.go(this.$router.currentRoute);
    },

    modifyCoData() {
      this.disappear = !this.disappear;
    },

    async modifyCoData2() {
      await modifyLocationComment({
        context: this.context,
        comment_no: Number(this.commentObj.comment_no)
      });
      this.$router.go(this.$router.currentRoute);
    },
    cancleModify() {
      this.$router.go(this.$router.currentRoute);
    }
    //   async deleteScData(){
    //   await deleteSubComment({subcomment_no: this.subcomment_no})
    //   this.$router.push({
    //     path: `/board/free`
    //   })
    // }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.comment-list-item {
  display: grid;
  padding-bottom: 20px;
}
.comment-list-item-name {
  /* justify-content: center; */
  /* border: 0.5px solid rgb(139, 139, 139); */
  height: 60px;
  text-align: center;
  width: 700px;
}
.name-name {
  grid-row: 1;
  font-weight: bold;
  text-align: left;
}
.comment-list-item-time {
  font-size: 6px;
  position: relative;
  bottom: 20px;
  right: 245px;
}
.comment-list-item-context {
  text-align: left;
  width: 44em;
  position: relative;
  /* border: 0.5px solid rgb(139, 139, 139); */
  bottom: 12px;
  left: 15px;
}
.comment-list-item-button {
  grid-column: 4;
  grid-row: 1;
  justify-content: center;
  align-items: center;
  /* border: 0.5px solid rgb(139, 139, 139); */
  border-left: none;
  height: 60px;
  padding-bottom: 1px;
  writing-mode: horizontal-tb;
  width: 120px;
}
.btn {
  margin-right: 1em;
}
.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
.btn1,
.btn2 {
  height: 40px;
  font-size: 10px;
  writing-mode: horizontal-tb;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url("https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg")
    no-repeat center;
  background-size: cover;
  position: relative;
  bottom: 3px;
}
</style>
