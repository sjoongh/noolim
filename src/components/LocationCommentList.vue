<template>
  <div>
    <div :key="item.comment_no" v-for="item in comments">
      <LocationCommentListItem :commentObj="item" />
    </div>
    <LocationCommentCreate :locaNo="locaNo" :reloadComments="reloadComments" />
  </div>
</template>

<script>
import LocationCommentListItem from "./LocationCommentListItem";
import LocationCommentCreate from "./LocationCommentCreate";
import { findLocationComment } from "../service";

export default {
  name: "LocationCommentList",
  props: {
    locaNo: Number
  },
  components: {
    LocationCommentListItem,
    LocationCommentCreate
  },
  async created() {
    const ret = await findLocationComment({ loca_no: this.locaNo });
    this.comments = ret.data;
  },
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async reloadComments() {
      const ret = await findLocationComment({ loca_no: this.locaNo });
      this.comments = ret.data;
    }
  }
};
</script>
