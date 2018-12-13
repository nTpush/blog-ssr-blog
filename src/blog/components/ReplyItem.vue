<template>
  <div :class="$style['comment']">
    <div :class="$style['comment__list']" v-for="(comment, index) in replays" :key="index">
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
      <div v-if="comment.children" class="item-children">
        <ReplyItem :replays="comment.children" :parentId="parentId"></ReplyItem>
      </div>

    </div>
  </div>
</template>
<script>
  import mComment from "@/blog/components/Comment.vue";
  import { READ_COMMENT_DATA_ASYNC, ADD_REPLY_DATA_ASYNC } from "@/components/Comment/module.js";
  export default {
    name: 'ReplyItem',
    components: { mComment },
    props: {
      replays: {
        type: Array,
        default: function () {
          return []
        }
      },
      parentId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        nowIndex: [],
        commentId: null
      };
    },
    methods: {
      dealGetComment(comment) {
        console.log(comment, '回复', this.commentId)
        this.$store.dispatch(ADD_REPLY_DATA_ASYNC, {...comment, comment_id: this.parentId, reply_id: this.commentId}).then(res => {
          console.log(res, 'reply')
          if (res) {
            console.log(this.$refs.comment, 'methods')
            this.$store.dispatch(READ_COMMENT_DATA_ASYNC, {id: this.$route.params ? this.$route.params.id : 9});
            this.$refs.comment[0].clearContent()
          }
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
  .comment {
    /*margin-left: 30px;*/
  }
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
