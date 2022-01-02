<template>
  <div>
    <div :key="item.comment_no" v-for="item in comments">
      <CommentListItem :commentObj="item" />
    </div>
    <CommentCreate :contentNo="contentNo" :reloadComments="reloadComments" />
  </div>
</template>

<script>
import CommentListItem from "./CommentListItem";
import CommentCreate from "./CommentCreate";
import { findComment } from "../service";

export default {
  name: "CommentList",
  props: {
    contentNo: Number
  },
  components: {
    CommentListItem,
    CommentCreate
  },
  async created() {
    const ret = await findComment({ content_no: this.contentNo });
    this.comments = ret.data;
  },
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async reloadComments() {
      const ret = await findComment({ content_no: this.contentNo });
      this.comments = ret.data;
    }
  }
};
</script>
