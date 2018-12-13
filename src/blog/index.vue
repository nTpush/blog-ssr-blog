<template>
  <div :class="$style['wrapper']" ref="wrapper">
    <mAbout></mAbout>
    <!-- <ul>
      <li v-for="(item,key) in articles" :key="key">{{ item.title }}</li>
    </ul>-->
    <div :class="$style['content']">
      <header :class="$style['header']"></header>
      <transition
        appear
        :duration="{ enter: 500, leave: 800 }"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        v-bind:css="false"
        v-if="showT"
      >
        <div :class="$style['body']" ref="body">
          <p :class="$style['phoneSearh']">
            <input
              type="text"
              autofocus="autofocus"
              placeholder="寻 找 真 正 的 好 代 码"
              @change="handleSearch"
              @enter="handleSearch"
              v-model="keyword"
            >
          </p>
          <div :class="$style['buttons']"></div>
          <!-- <p>任何诡异的问题背后总会犯有低级的错误!</p> -->
          <div :class="$style['search']">
            <p>什么才是真正的好代码？</p>
            <input
              type="text"
              autofocus="autofocus"
              placeholder="寻 找 真 正 的 好 代 码"
              @change="handleSearch"
              @enter="handleSearch"
              v-model="keyword"
            >
            <h6 v-if="note">
              <span>温馨提示: {{note}}</span>
            </h6>
          </div>
          <ul ref="uls" v-if="!loading">
            <li li v-for="(item,key) in articles" :key="key" @click="handleJumpRoute(item)">
              <div>
                <div :class="$style['item']">
                  <div
                    :class="$style['type1']"
                    v-if="!(item.type !== '' && Number(item.type) === 0)"
                  >
                    <div>
                      <p :class="$style['title']">{{ item.title }}</p>
                      <div :class="$style['tag']">
                        <div>
                          <span
                            :style="{background: `#${tagColor[index]}`}"
                            v-for="(tag, index) in item.mate_id"
                            :key="index"
                          >{{ tag.name }}</span>
                        </div>
                        <i>{{item.author}} ● {{item.created_at}}</i>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p :class="$style['summary']">{{ item.summary }}</p>
                      </div>
                      <div :class="$style['fixeInfo']"></div>
                    </div>
                  </div>
                  <div :class="$style['type2']" v-else>
                    <div>
                      <img :src="item.path" alt>
                    </div>
                    <div>
                      <p :class="$style['title']">{{item.title}}</p>
                      <p :class="$style['summary']">{{item.summary}}</p>
                      <div :class="$style['tag']">
                        <div>
                          <span
                            :style="{background: `#${tagColor[index]}`}"
                            v-for="(tag, index) in item.mate_id"
                            :key="index"
                          >{{ tag.name }}</span>
                        </div>
                        <i style="color:#f5f5f5">{{item.author}} ● {{item.created_at}}</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <transition
            appear
            v-if="!loading"
            :duration="{ enter: 500, leave: 800 }"
            v-on:before-enter="beforeEnterLoading"
            v-on:enter="enterLoading"
            v-on:leave="leaveLoading"
            v-bind:css="false"
          ></transition>
          <p v-else>没有内容哦！抓紧写文章吧。</p>
        </div>
      </transition>
      <footer :class="$style['footer']"></footer>
      <div v-if="loading" :class="$style['loading']">
        <img src="../assets/images/Preloader_7.gif" alt>
      </div>
      <!-- <p ><img src='../assets/images/Preloader_7.gif' v-if="loading"/></p> -->
    </div>
  </div>
</template>
<script>
import {
  LODA_ARTICLES_ASYNC,
  ADD_ARTICLE_ASYNC
} from "@/components/Article/module";
import Velocity from "velocity-animate";
import { setTimeout } from "timers";
import mAbout from "@/blog/components/About.vue";

export default {
  asyncData({ store, route }) {
    return store.dispatch(LODA_ARTICLES_ASYNC);
  },
  name: "BlogIndex",
  components: { mAbout },
  data() {
    return {
      id: "",
      showT: true,
      tagColor: ["DBB4CB", "A3BA8E", "9FD5D8", "DEC1A0", "DBBCB7"],
      firefox: true,
      index: 1,
      hArr: [],
      loading: false,
      keyword: "",
      note: ""
    };
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles;
    },
    articlesAll() {
      return this.$store.getters.getArticlesAll;
    }
  },
  watch: {
    keyword(v) {
      this.keyword = v.replace(/[ \\< | \\> ]/g, "");
      this.note = `您正在搜索的内容是：${this.keyword}`;
      if (this.keyword.length === 0) {
        this.note = "";
      }
      if (this.keyword.length >= 20) {
        this.keyword = this.keyword.slice(0, 20);
        this.note = "输入的字符不能超过20个字！";
      }
    }
  },
  mounted() {
    this.firefox = navigator.userAgent.indexOf("Firefox") !== -1;
    if (typeof window === "object") {
      setTimeout(() => {
        this.getPuBuLiuShow();
      }, 500);
      window.onresize = () => {
        this.getPuBuLiuShow();
      };
    }
  },
  methods: {
    handleSearch() {
      this.$store.dispatch(LODA_ARTICLES_ASYNC, this.keyword);
      this.loading = true;
      this.index = 1;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      setTimeout(() => {
        this.getPuBuLiuShow();
      }, 1000);
    },
    MouseWhellDefault() {
      if (this.articles.length === 0) {
        return;
      }
      if (typeof window === "object") {
        let scrollTop =
          window.innerWidth > 768
            ? this.$refs["wrapper"].scrollTop
            : document.documentElement.scrollTop;
        let heightU =
          window.innerWidth > 768
            ? this.$refs["wrapper"].scrollHeight
            : document.documentElement.scrollHeight;
        let heightW =
          window.innerWidth > 768
            ? this.$refs["wrapper"].clientHeight
            : document.documentElement.clientHeight;
        console.log(scrollTop, heightU, heightW, 1009);
        if (!this.$refs["uls"]) {
          return;
        }
        let lis = this.$refs["uls"].childNodes;
        if (lis.length >= this.articlesAll.length) {
          return;
        }
        if (scrollTop >= heightU - heightW) {
          this.index++;
          console.log(this.index, "index");
          this.loading = true;
          this.$store.dispatch(ADD_ARTICLE_ASYNC, this.index);
          this.loading = false;
          setTimeout(() => {
            this.getPuBuLiuShow();
          }, 50);
        }
      }
    },
    /****
     *获取 pin高度 最小值的索引index
     */
    getminHIndex(arr, minH) {
      for (var i in arr) {
        if (arr[i] === minH) {
          return i;
        }
      }
    },
    getPuBuLiuShow(first = 0) {
      let wrapper = this.$refs["wrapper"];
      setTimeout(() => {
        if (this.articles.length === 0) {
          return;
        }
        let ul = this.$refs["uls"];
        if (window.innerWidth > 768) {
          console.log(this.firefox, 'this.firefox')
            this.firefox
              ? window.removeEventListener("DOMMouseScroll", null, false)
              : (window.onscroll = null);
            this.firefox
              ? wrapper.removeEventListener(
              "DOMMouseScroll",
              this.MouseWhellDefault,
              false
              )
              : wrapper.onscroll = this.MouseWhellDefault;
        } else {
          if (this.firefox) {
            this.firefox
              ? wrapper.removeEventListener("DOMMouseScroll", null, false)
              : (wrapper.onscroll = null);
            this.firefox
              ? window.removeEventListener(
              "DOMMouseScroll",
              this.MouseWhellDefault,
              false
              )
              : (window.onscroll = this.MouseWhellDefault);
          }
        }
        if (window.innerWidth > 992) {
          if (!this.$refs["uls"]) {
            return;
          }
          let lis = this.$refs["uls"].childNodes;
          let bodyContent = this.$refs["body"];
          let oBoxW = lis[0].offsetWidth;
          let num = Math.floor(bodyContent.offsetWidth / oBoxW);
          // var hArr = []
          if (lis.length >= this.articlesAll.length) {
            return;
          }
          for (var i = first; i < lis.length; i++) {
            if (lis[1]) {
              lis[1].style.left = `500px`;
            }
            lis[i].style.position = "absolute";
            var pinH = lis[i].offsetHeight;
            if (i < num) {
              this.hArr[i] = pinH;
            } else {
              var minH = Math.min.apply(null, this.hArr);
              var minHIndex = this.getminHIndex(this.hArr, minH);
              lis[i].style.top = `${minH + 30}px`;
              lis[i].style.left = `${lis[minHIndex].offsetLeft}px`;
              this.hArr[minHIndex] += lis[i].offsetHeight + 30;
            }
          }
          var maxH = Math.max.apply(null, this.hArr);
          ul.style.height = `${maxH + 100}px`;
        } else {
          ul.style.height = `auto`;
          let lis = this.$refs["uls"].childNodes;
          for (var j = 0; j < lis.length; j++) {
            lis[j].style.position = "static";
          }
        }
      }, 500);
    },
    handleJumpRoute(item) {
      this.id = item.id;
      this.showT = !this.showT;
    },
    beforeEnter: function(el) {
      var height = document.body.scrollWidth;
      el.style.transformOrigin = "left";
      el.style.opacity = 0;
      el.style.top = `-${height}px`;
    },
    enter: function(el, done) {
      if (typeof window === "object") {
        Velocity(el, { opacity: 1, top: 100 }, { duration: 1000 });
      }
    },
    leave: function(el, done) {
      var height = document.body.scrollWidth + 500;
      if (typeof window === "object") {
        Velocity(el, { opacity: 0, top: `${height}px` }, { duration: 1000 });
      }
      this.$router.push(`/detail/${this.id}`);
    },
    beforeEnterLoading(el) {
      el.style.opacity = 0;
    },
    enterLoading(el, done) {
      if (typeof window === "object") {
        Velocity(el, { opacity: 1 }, { duration: 1000 });
      }
    },
    leaveLoading(el, done) {
      if (typeof window === "object") {
        Velocity(el, { opacity: 0 }, { duration: 1000 });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="postcss">
@font-face {
  font-family: "myfont"; /*定义字体名称*/
}
@keyframes runOpa {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
  /* background-color:red; */
} /* 滑块颜色 */
.content {
  width: 100%;
  margin: 0 auto;
}
/* .header {
  height: 100px;
} */
.body {
  width: 100%;
  background: transparent;
  /* overflow: auto; */
  position: absolute;
  overflow: hidden;
}
.body .phoneSearh {
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  height: 80px;
  line-height: 80px;
}
.body .phoneSearh input {
  width: 90%;
  background: transparent;
  outline: none;
  border: none;
  text-align: center;
  border-bottom: 1px solid #e3e3e3;
  line-height: 40px;
  font-size: 14px;
}
.body > ul {
  width: 100%;
  margin: 0 auto;
  /* display: flex;
  flex-wrap: wrap; */
  position: relative;
  /* height: 300vh; */
}
.body > ul li {
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
  justify-content: space-between;
  position: absolute;
  opacity: 0;
  animation: runOpa 1s forwards;
  cursor: pointer;
}
.body > ul li:nth-child(n) {
  animation-delay: 1s;
}
.body > ul li:nth-child(2n) {
  animation-delay: 1.2s;
}
.body > ul li:nth-child(3n) {
  animation-delay: 2s;
}
.body > ul li div {
  display: block;
  width: 100%;
  /* height: 250px; */
}
.body > ul li div .item {
  width: 96%;
  margin: 0 auto;
  position: relative;
}

.body > ul li div .item .type1 > div:first-child {
  width: 100%;
  height: 65px;
  background: #f5f5f5;
}
.body > ul li div .item .type1 > div:last-child {
  background: rgba(233, 241, 245, 0.9);
  text-indent: 20px;
}
.body > ul li div .item .type2 > div {
  background: #fff;
}
.body > ul li div .item .type2 > div:first-child {
  overflow: hidden;
}
.body > ul li div .item .type2 > div:first-child img {
  width: 100%;
  margin: 0;
  padding: 0;
}
.body > ul li div .item .type2 > div:last-child {
  width: 100%;
  height: 70px;
  background: #d6dde1;
}

.body > ul li div .item .title {
  word-wrap: break-word;
  word-break: normal;
  font-size: 18px;
  padding: 10px;
}
.body > ul li div .item .tag div {
  /* width: 50%; */
  padding: 0 10px;
}
.body > ul li div .item .tag i {
  color: #ccc;
  font-style: normal;
  display: block;
  width: 40%;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 标签 */
.body > ul li div .item .tag {
  display: flex;
  justify-content: space-between;
}
.body > ul li div .item .tag span {
  margin-right: 10px;
  font-size: 12px;
  padding: 3px 10px;
  color: #fff;
}
.body > ul li div .item .summary {
  line-height: 30px;
  font-family: "宋体";
  padding: 10px;
}
.body > ul li div .item .type2 > div:last-child .summary {
  background: #fff;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body > ul li div .item .type2 > div:last-child .tag {
  margin-top: 9px;
}

.body > ul li div .item .type2 > div:last-child .title {
  position: absolute;
  top: -35px;
  color: #fff;
}

.loading {
  position: fixed;
  left: 0;
}

.body > p {
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  font-family: "幼圆";
}
/* .body .buttons {
  height: 80px;
  width: 100%;
} */
.body .search {
  display: none;
  height: 400px;
  width: 100%;
  text-align: center;
  background: url("../assets/images/flower.png") no-repeat center;
  background-size: 300px;
}
.body .search p {
  color: #f5f5f5;
  font-size: 20px;
  letter-spacing: 5px;
  padding-top: 150px;
  margin-bottom: 10px;
}
.body .search input {
  width: 50%;
  height: 30px;
  border: none;
  padding: 10px;
  padding-bottom: 0px;
  background: transparent;
  text-align: center;
  font-size: 18px;
  color: #fff;
  border-bottom: 2px solid #fff;
  line-height: 0;
}
.body .search h6 {
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
  text-align: left;
  font-weight: normal;
  background: #fff;
  padding: 5px 10px;
}
.body .search h6 span {
  color: #222;
}
.footer {
  height: 100px;
}
@media (min-width: 768px) {
  .content {
    width: 700px;
  }
  .body {
    width: 700px;
  }
  .wrapper {
    height: 100vh;
    background: url("https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/images/background.jpg");
    background-size: cover;
    background-position: top;
    overflow: auto;
    position: absolute;
    width: 100%;
  }
  .body .search {
    display: block;
  }
  .body .phoneSearh {
    display: none;
  }
}
@media (min-width: 992px) {
  .content {
    width: 966px;
  }
  .body {
    width: 966px;
  }
  .body > ul li {
    width: 480px;
  }
  .body > ul li:first-child .summary {
    min-height: 300px !important;
  }
}
@media (min-width: 1200px) {
  .content {
    width: 1024px;
  }
  .body {
    width: 1024px;
  }
  .body > ul li {
    width: 500px;
  }
}
</style>
