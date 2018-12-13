<template>
  <div :class="$style['comment']">
    <div :class="$style['comment__list']" v-for="(comment, index) in $store.getters.getCommentsAll" :key="index">
      <div :class="$style['comment__list__content']">
        <div :class="$style['comment__list__content__image']">٩۹◔̯◔</div>
        <div :class="$style['comment__list__content__info']">
          <p :class="$style['comment__list__content__info__name']">{{comment.user}}</p>
          <p :class="$style['comment__list__content__info__content']">{{comment.content}}</p>
          <p :class="$style['comment__list__content__info__other']">
            <span>#{{index + 1}}</span>
            <span>{{comment.created_at}}</span> &emsp;
            <button
              :class="$style['comment__list__content__info__other__reply']"
              @click="handleReply(index, comment.id)"
            >{{nowIndex.indexOf(index) !== -1?'取消哦':'回复'}}</button>
          </p>
        </div>
      </div>
      <br>
      <mComment ref="comment" :showHead="false" v-if="nowIndex.indexOf(index) !== -1" @getComment="dealGetComment"></mComment>

      <div>
        <mReplyItem :replays="comment.hasManyReply" :parentId="comment.id"></mReplyItem>
        <!--<commentItem ></commentItem>-->
      </div>
    </div>
  </div>
</template>
<script>
import mComment from "@/blog/components/Comment.vue";
import mReplyItem from "@/blog/components/ReplyItem.vue"
import { READ_COMMENT_DATA_ASYNC, ADD_REPLY_DATA_ASYNC } from "@/components/Comment/module.js";
export default {
  name: 'commentItem',
  asyncData({ store, route }) {
    return store.dispatch(READ_COMMENT_DATA_ASYNC, {id: this.$route.params ? this.$route.params.id : 9});
  },
  components: { mComment, mReplyItem },
  data() {
    return {
      nowIndex: [],
      commentId: null
    };
  },
  created() {
    console.log(this.$route.params.id, 'id')
    this.$store.dispatch(READ_COMMENT_DATA_ASYNC, {id: this.$route.params ? this.$route.params.id : 9}).then(res => {
      if (res) {
        console.log(this.comments);
      }
    });
  },
  methods: {
    // 回复
    dealGetComment(comment) {
      console.log(comment, '回复', this.commentId)
      this.$store.dispatch(ADD_REPLY_DATA_ASYNC, {...comment, comment_id: this.commentId, reply_id: 0}).then(res => {
        if (res) {
            this.$refs.comment[0].clearContent()
            this.$store.dispatch(READ_COMMENT_DATA_ASYNC, {id: this.$route.params ? this.$route.params.id : 9});
        }
        console.log(res, 'reply')
      });
    },
    handleReply(index, id) {
      this.commentId = id
      if (this.nowIndex.indexOf(index) !== -1) {
        this.nowIndex.splice(this.nowIndex.indexOf(index), 1);
      } else {
        this.nowIndex.push(index);
      }
    }
  }
};
</script>
<style module lang="postcss">
.comment__list {
  padding: 0 20px;
}
.comment__list__content {
  border-top: 1px solid #e4effa;
  padding-top: 20px;
  display: flex;
}
.comment__list__content__image {
  width: 50px;
  margin-bottom: 10px;
  text-align: center;
}
.comment__list__content__info {
  width: 100%;
  margin: 0 10px;
}
.comment__list__content__info__name {
  font-size: 14px;
  font-weight: bold;
  color: #6d7479;
  margin-bottom: 10px;
}
.comment__list__content__info__content {
  margin-bottom: 10px;
}

.comment__list__content__info__other span {
  color: #cbcbd3;
  margin-right: 10px;
}
.comment__list__content__info__other__reply {
  outline: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  background: #f5f5f5;
}
.comment__list__content__info__other__reply:hover {
  background: #e4effa;
  color: #61a6e6;
}
</style>
