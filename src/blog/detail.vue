<template>
  <div :class="$style['wrapper']">
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
        <VueMarkdown
          :source="article.content"
          v-highlight
          v-if="showH"
          :class="{[$style.md]: Number(article.type) === 3, [$style.md1]: Number(article.type) !== 3}"
        ></VueMarkdown>
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
import VueMarkdown from "vue-markdown";
import Velocity from "velocity-animate";

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
    VueMarkdown
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
    beforeEnter: function(el) {
      var height = document.body.scrollWidth;
      el.style.transformOrigin = "left";
      el.style.opacity = 0;
      el.style.top = `-${height + 200}px`;
    },
    enter: function(el, done) {
      setTimeout(() => {
        if (typeof window === "object") {
          Velocity(el, { opacity: 1, top: 0 }, { duration: 1000 });
        }
      }, 500);
      // Velocity(el, { opacity: 1, top: 0 }, { duration: 1000 })
    },
    // 离开时
    beforeLeave: function(el) {
      // ...
      console.log(el, "el");
    },
    leave: function(el, done) {
      var height = document.body.offsetHeight;
      if (typeof window === "object") {
        Velocity(el, { opacity: 0, top: `${height}px` }, { duration: 1000 });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="postcss">
/* @import './css/style1.css'; */

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
  /* position: absolute;
    left: 50%;
    transform: translateX(-50%); */
  padding-top: 30px;
  min-height: 100vh;
}
.md {
  padding: 0 10px;
  font-size: 14px;
  color: #222;
  opacity: 0;
  animation: opacityShow 1s forwards;
  animation-delay: 1;
  padding-bottom: 100px;
}

.md em {
  font-size: 16px;
  font-style: normal;
  line-height: 40px;
}

.md h1,.md h2,.md h3,.md h4,.md h5,.md h6,.md h7 {
  font-size: 24px;
  margin-bottom: 30px;
}
.md p {
  margin-bottom: 0;
}
.md ul {
  padding: 0;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
}
.md > ul > li{
  font-size: 14px;
}

.md > ul > li > ul {
  font-size: 12px;
  margin-bottom: 10px;
}
.md ul li {
  line-height: 30px;
}

.md ul:first-of-type {
  margin-top: 0 !important;
}
.md1 {
  padding: 0 10px;
  font-size: 14px;
}

.md1 p {
  line-height: 30px;
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
