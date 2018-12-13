<template>
  <div :class="$style['comment']">
    <div :class="$style['comment__content']">
      <div :class="$style['comment__content__head']" v-if="showHead">
        <div :class="$style['comment__content__head__count']">{{allComment}}评论：</div>
        <h3 :class="$style['comment__content__info']">全 部 评 论</h3>
      </div>
      <div :class="$style['comment__content__body']">
        <div :class="$style['comment__content__body__head']">
          <span v-if="showHead">{{ (content === '') || (content === " ") ? '(◕‿◕✿)' : '(◡‿◡✿)'}}</span>
        </div>
        <div :class="$style['comment__content__body__main']">
          <mContenteditable ref="contenteditable" v-model="content"></mContenteditable>
          <br>
          <div :class="$style['comment__content__body__main__button']">
           <div :class="$style['comment__content__body__main__button__error']">error:info</div>
            <!-- <p :class="$style['footer_load', 'footer_hight']"> -->
           <div :class="$style['comment__content__body__main__button__box']">
             <div><button>表情</button></div>
             <div> <label for="user">emmm..♪怎么称呼好呢？</label><input v-model="user" type="text" name="user"> &emsp;
               <label for="email">再说个邮箱吧！</label><input v-model="email" type="text" name="email">
             </div>
           </div>
          </div>
        </div>
        <div :class="$style['comment__content__body__footer']">
          <button @click="handleSubmit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mContenteditable from "@/blog/components/Contenteditable.vue";

export default {
  components: { mContenteditable },
  props: {
    allComment: {
      type: Number,
      default: 29
    },
    showHead: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      content: " ",
      user: "",
      email: ""
    };
  },
  methods: {
    handleInput($event) {
      this.content = $event.target.innerText;
    },
    // 提交
    handleSubmit() {
      let data = {
        article_id: this.$route.params.id,
        content: this.content,
        user: this.user,
        email: this.email
      }
      this.$emit('getComment', data)
      this.content = " "
    },
    // 清空
    clearContent(index) {
      this.$refs.contenteditable.clearContent()
    }
  }
};
</script>
<style module lang="postcss">
.comment {
  padding: 0 10px;
  /*margin-top: 50px;*/
}
.comment__content__head__count {
  font-size: 16px;
  margin-bottom: 10px;
}
.comment__content__info {
  color: #60a8e7;
  font-size: 14px;
  border-bottom: 1px solid #e5f0fa;
  position: relative;
  margin: 20px 0;
}
.comment__content__info:after {
  content: "";
  display: block;
  width: 0px;
  height: 0px;
  background: transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid #60a8e7;
  margin-left: 29px;
}
.comment__content__info:before {
  content: "";
  display: block;
  width: 70px;
  height: 1px;
  background: #60a8e7;
  position: absolute;
  bottom: -1px;
}
.comment__content__body__head {
  margin-bottom: 10px;
  text-align: center;
  width: 50px;
}
.comment__content__body__main__button__box{
  /*display: flex;*/
  /*justify-content: space-around;*/
  width: 100%;
  margin-bottom: 20px;
}
.comment__content__body__main__button__box div:first-of-type{
  text-align: left;
  width: 10%;
}
.comment__content__body__main__button__box div:last-of-type{
  text-align: right;
  width: 100%;
}
.comment__content__body__main__button__box button {
  border: none;
  outline: none;
  background: #f5f5fa;
  width: 100px;
  padding: 10px 0;
  cursor: pointer;
  margin-bottom: 20px;
}
.comment__content__body__main__button__box input {
  border: none;
  outline: none;
  background: #fff;
  border: 1px solid #f5f5f5;
  padding: 5px 10px;
}

.comment__content__body__main__button__error {
  margin-bottom: 10px;
}

.comment__content__body__footer button {
  border: none;
  outline: none;
  background: #f5f5fa;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
}
@media (min-width: 768px) {
  .comment__content__body {
    display: flex;
    justify-content: space-around;
  }
  .comment__content__body__main {
    width: 100%;
    margin: 0 10px;
  }
  .comment__content__body__footer {
    width: 100px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
