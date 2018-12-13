<template>
  <div :class="$style['wrapper']">
    <mAbout></mAbout>
    <!-- <ul>
      <li v-for="(item,key) in articles" :key="key">{{ item.title }}</li>
    </ul>-->
    <transition
      appear
      :duration="{ enter: 100, leave: 800 }"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
      v-if="showT"
    >
      <div :class="$style['content']">
        <mClose></mClose>
        <mInfo></mInfo>

        <VueMarkdown :source="article.content" v-highlight v-if="showH" :class="$style['md']"></VueMarkdown>
        <div style="margin-bottom: 50px"></div>
        <!-- 评论功能 -->
        <mComment ref="comment" :class="$style['animate']" @getComment="dealGetComment"></mComment>
        <!--评论列表-->
        <mCommentList :class="$style['animate']" ></mCommentList>
        <div style="margin-bottom: 100px"></div>
        <!-- 版权、信息 -->
        <mFooter :class="$style['animate']"></mFooter>
        <!-- <VueMarkdown :source="test" v-highlight></VueMarkdown> -->
        <!-- <div v-html="html" class="center" v-highlight></div> -->
      </div>
    </transition>
  </div>
</template>

<script>
import {
  LODA_ARTICLES_ASYNC,
  LODA_ARTICLE_ASYNC
} from "@/components/Article/module";
import { ADD_COMMENT_DATA_ASYNC, READ_COMMENT_DATA_ASYNC } from "@/components/Comment/module.js";
import VueMarkdown from "vue-markdown";
import Velocity from "velocity-animate";
import mClose from "@/blog/components/Close.vue";
import mAbout from "@/blog/components/About.vue";
import mFooter from "@/blog/components/Footer.vue";
import mInfo from "@/blog/components/Info.vue";
import mComment from "@/blog/components/Comment.vue";
import mCommentList from "@/blog/components/CommentList.vue";
// import {
//   ARTICLE_MD_URL
// } from '@/apis/API.js'
import { setTimeout } from "timers";
// import readme from '../assets/ssr.md'
export default {
  asyncData({ store, route }) {
    console.log("33333333333333333333333333333333333333");
    return store.dispatch(LODA_ARTICLES_ASYNC);
  },
  name: "BlogIndex",
  components: {
    VueMarkdown,
    mClose,
    mAbout,
    mFooter,
    mInfo,
    mComment,
    mCommentList
  },
  data() {
    return {
      showT: true,
      html: "",
      showH: false
    };
  },
  computed: {
    article() {
      return this.$store.getters.getArticle;
    }
  },
  mounted() {
    this.$store.dispatch(LODA_ARTICLE_ASYNC, { id: this.$route.params.id });
    setTimeout(() => {
      this.showH = true;
    }, 1000);
  },

  methods: {
    // 提交评论
    dealGetComment: function (comment) {
        console.log(comment, 'detail')
      this.$store.dispatch(ADD_COMMENT_DATA_ASYNC, comment).then(res => {
        if (res) {
          this.$store.dispatch(READ_COMMENT_DATA_ASYNC, {id: this.$route.params ? this.$route.params.id : 9});
          this.$refs.comment.clearContent()
        }
        console.log(res, 'res')
      });
    },
    beforeEnter: function(el) {
      var height = document.body.scrollWidth;
      el.style.transformOrigin = "left";
      el.style.top = `-${height + 200}px`;
    },
    enter: function(el, done) {
      if (typeof window === "object") {
        Velocity(el, { top: 0 }, { duration: 1000 });
      }
      // Velocity(el, { opacity: 1, top: 0 }, { duration: 1000 })
    },
    // 离开时
    beforeLeave: function(el) {
      // ...
      console.log(el, "el");
    },
    leave: function(el, done) {
      var height = document.body.scrollWidth;
      if (typeof window === "object") {
        Velocity(el, { top: `${height}px` }, { duration: 1000 });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="postcss">
/* @import "./css/detail.css"; */
.wrapper {
  overflow: hidden;
}
.wrapper::-webkit-scrollbar-track {
  background-color: transparent;
} /* 滚动条的滑轨背景颜色 */
.wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
.wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.4);
} /* 滑块颜色 */
.content {
  width: 100%;
  background: #fff;
  margin: 10px auto;
  position: relative;
  padding-bottom: 100px;
  /* position: absolute;
    left: 50%;
    transform: translateX(-50%); */
  min-height: 100vh;
}

.md {
  padding: 0 10px;
  color: #222;
  line-height: 30px;
  opacity: 0;
  animation: opacityShow 2s forwards;
  animation-delay: 0.1s;
}
.animate {
  opacity: 0;
  animation: opacityShow 1s forwards;
  animation-delay: 1s;
}
.md h1 {
  font-size: 28px;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 20px;
  margin-top: 20px;
}
.md h2 {
  font-size: 24px;
  margin-top: 20px;
}
.md h3 {
  font-size: 20px;
  margin-top: 20px;
}
.md h4 {
  font-size: 18px;
  margin-top: 20px;
}
.md h5 {
  font-size: 14px;
  margin-top: 20px;
}
.md h6 {
  font-size: 12px;
  margin-top: 20px;
}

.md ul {
  padding: 0 20px;
}
.md ul li {
  margin-top: 10px;
}

.md table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  text-align: center;
  color: #677690;
}
.md table th {
  background: #dde5f2;
  line-height: 40px;
}
.md table tr {
  line-height: 35px;
}
.md table tr:nth-child(2n) {
  background: #f2f5fa;
}
.md em {
  font-size: 16px;
  font-style: normal;
  line-height: 40px;
}
.md blockquote {
  padding: 5px 0;
  padding-left: 10px;
  border-left: 5px solid #60a6e6;
  margin-bottom: 10px;
  background: #f7fcff;
  margin-top: 20px;
}
.md a {
  color: #68758e;
}
@keyframes opacityShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (min-width: 768px) {
  .content {
    width: 700px;
  }
  .wrapper {
    height: 100vh;
    background: url("https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/images/background.jpg");
    background-size: cover;
    background-position: top;
    overflow-y: scroll;
    position: fixed;
    width: 100%;
    box-sizing: content-box;
  }
}
@media (min-width: 992px) {
  .content {
    width: 900px;
  }
}
@media (min-width: 1200px) {
  .content {
    width: 1024px;
  }
}
</style>
