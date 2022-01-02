<template>
  <div class="comment-create">
    <b-input-group :prepend="name" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        :placeholder="
          isSubComment ? '댓글에 댓글을 달아주세요' : '댓글을 달아주세요'
        "
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button
          class="writeBtn"
          variant="outline-primary"
          @click="isSubComment ? createSubComment() : createComment()"
          >작성하기</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { addLocationComment, addSubComment } from "../service";

export default {
  name: "LocationCommentCreate",
  props: {
    locaNo: Number,
    reloadComments: Function,
    reloadSubComments: Function,
    subCommentToggle: Function,
    isSubComment: Boolean,
    commentNo: Number
  },
  data() {
    return {
      name: this.$store.state.account.user.username,
      context: ""
    };
  },
  methods: {
    async createComment() {
      await addLocationComment({
        user_no: this.$store.state.account.user.userId,
        loca_no: this.locaNo,
        context: this.context
      });
      this.$router.go(this.$router.currentRoute);
      this.reloadComments();
      this.subCommentToggle();
      this.context = "";
    }

    // async createSubComment() {
    //   await addSubComment({
    //    user_no:1,
    //    comment_no:this.commentNo,
    //    context:this.context});
    //   this.reloadSubComments();
    //   this.subCommentToggle();
    //   this.context = "";
    // },
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
.writeBtn {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
