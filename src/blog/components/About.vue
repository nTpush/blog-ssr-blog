<template>
  <div :class="$style['about']">
    <div :class="$style['line']"></div>
    <div :class="$style['line_1']"></div>
    <div :class="$style['me']" @click="showMe=!showMe"></div>
    <div :class="$style['text']" @click="showMe=!showMe">{{showMe?'✘':'Me'}}</div>

    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <div :class="$style['me__content']" v-if="showMe">
        <div :class="$style['me__type1']" v-if="activeClick===1">
          <div :class="$style['me__image']">
            <img src="../../assets/images/me.png" alt>
          </div>
          <div :class="$style['me__name']">温柔、以待</div>
          <div :class="$style['me__info']">
            ✌
            杭州，滨江
          </div>
        </div>

        <div :class="$style['me__type2']" v-if="activeClick===2">
          <p :class="$style['me__info']">
            ✎
            JavaScript、PHP、etc
          </p>
          <p :class="$style['me__info']">当才华撑不起野心时，就静下心来学习</p>
        </div>
        <div :class="$style['me__choose']">
          <span
            v-for="(item) in [1,2]"
            :key="item"
            @click="changeType(item)"
            :class="{[$style.active]: item===activeClick}"
          ></span>
        </div>
        <div :class="$style['me__concat']">
          <ul>
            <li>
              <div>
                <img src="../../assets/images/github.png">
                <a href="https://github.com/nTpush" target="_blank">gitHub</a>
              </div>
              <div>
                <span :class="$style['me__other']"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Velocity from "velocity-animate";
export default {
  data() {
    return {
      activeClick: 1,
      showMe: false
    };
  },
  methods: {
    changeType(index) {
      this.activeClick = index;
    },
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.left = "-300px";
      el.style.transformOrigin = "left";
    },
    enter: function(el, done) {
      Velocity(el, { opacity: 1, left: 0 }, { duration: 300 });
    },
    afterEnter: function(el) {},
    enterCancelled: function(el) {},
    beforeLeave: function(el) {},
    leave: function(el, done) {
      Velocity(el, { opacity: 0, left: "-300px" }, { duration: 300 });
    },
    afterLeave: function(el) {},
    leaveCancelled: function(el) {}
  }
};
</script>
<style module lang="postcss">
.about a {
  color: #fff;
}
.line {
  width: 10px;
  height: 100vh;
  background: #fff;
  position: fixed;
  z-index: 99;
}
.line_1 {
  width: 100%;
  height: 10px;
  background: #fff;
  position: fixed;
  z-index: 99;
}
.me {
  position: fixed;
  top: 10px;
  right: 0;
  z-index: 99;
  width: 0;
  height: 0;
  border-color: transparent #fff;
  border-width: 0px 100px 60px 0px;
  border-style: solid;
  text-align: right;
  cursor: pointer;
}
.text {
  position: fixed;
  top: 10px;
  right: 0;
  z-index: 99;
  width: 50px;
  text-align: center;
  font-weight: bold;
  line-height: 30px;
  cursor: pointer;
}
.me__content {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 10px;
  z-index: 99;
  background: #072f3e;
  text-align: center;
  color: #f2f2f2;
}
.me__type2,
.me__type1 {
  overflow: hidden;
}
.me__type2 {
  padding: 71px 0;
}
.me__content div {
  margin-top: 20px;
}
.me__image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  line-height: 110px;
  display: inline-block;
  margin-top: 30px;
  background: #0f242e;
}
.me__image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 5px;
}
.me__name {
  font-size: 16px;
}
.me__info {
  color: #818b8e;
  margin-top: 10px !important;
}
.me__choose span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0f242e;
  cursor: pointer;
  margin-right: 8px;
}
.me__concat ul {
  padding: 10px;
  list-style: none;
}
.me__concat ul li {
  border-bottom: 1px solid #172831;
  display: flex;
  cursor: pointer;
  transition: all 1s;
  justify-content: space-between;
  padding: 0 30px;
  padding-bottom: 15px;
}
.me__concat ul li:hover {
  background: rgba(255, 255, 255, 0.1);
}
.me__concat ul li img {
  width: 25px;
  display: inline;
  vertical-align: middle;
  margin-right: 10px;
}
.me__other {
  line-height: 20px;
}
.active {
  background: #ccc !important;
}
@media (min-width: 768px) {
  .me__content {
    width: 300px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
