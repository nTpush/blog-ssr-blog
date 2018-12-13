<template>
  <div :class="$style['footer']">
    <footer>
      <p :class="$style['footer__animate']">
        <span>(◡‿◡✿)</span>
      </p>
      <p :class="$style['footer_hight']">✿&emsp;☂&emsp;♪&emsp;☄&emsp;ั๑&emsp;☪</p>
      <p :class="$style['footer__copyright']">
        Copyright
        <span :class="$style['footer_hight']">©</span> 2018
        <span :class="$style['footer_hight']">温柔、以待</span>
      </p>
      <p :class="$style['footer_base']">浙ICP备17031323号-2 • Base on mySelf</p>
      <p :class="$style['footer_countdown']">
        以温柔的方式遥望星空
        <span :class="$style['footer_hight']">{{day}}</span>天
        <span :class="$style['footer_hight']">{{hours}}</span>小时
        <span :class="$style['footer_hight']">{{mins}}</span>分
        <span :class="$style['footer_hight']">{{secs}}</span>秒
      </p>
      <p :class="$style['footer_load', 'footer_hight']">
        加载[
        <span :class="$style['footer__time']">
          {{loadTime}}
          <sup>s</sup>
        </span> ]
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadTime: 0,
      day: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      startTime: "2018-1-1"
    };
  },
  methods: {
    onLoad() {
      if (typeof window === "object") {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;
      this.loadTime = page_load_time;
      }
    },
    get_time_spent() {
      var time_now = new Date();
      let start_time = new Date(this.startTime);
      return Number(time_now) - Number(start_time);
    },
    show_secs() {
      this.day = parseInt(this.get_time_spent() / (1000 * 60 * 60 * 24) + "");
      this.hours = parseInt(
        (this.get_time_spent() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + ""
      );
      this.mins = parseInt(
        (this.get_time_spent() % (1000 * 60 * 60)) / (1000 * 60) + ""
      );
      this.secs = parseInt((this.get_time_spent() % (1000 * 60)) / 1000 + "");
      setTimeout(this.show_secs, 1000); // 每隔1s刷新一次input里的值
    }
  },
  created() {
    this.onLoad();
    this.show_secs();
  }
};
</script>
<style module lang="postcss">
@font-face {
  font-family: "magic";
  src: url("../../assets/font/foll.ttf"); /* IE9 */
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "number";
  src: url("../../assets/font/magic.ttf");
}

.footer {
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  font-family: magic;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.footer_hight {
  color: #1fbb9b;
}

.footer__animate {
  position: relative;
}

.footer__animate span {
  position: absolute;
  top: -18px;
  left: 50%;
  animation: emAnimate 1s infinite;
}

.footer__time,
.footer_countdown span {
  font-family: number;
}

.footer_countdown span {
  padding: 0 5px;
}

@keyframes emAnimate {
  0% {
    transform: translateX(-50%);
  }

  50% {
    transform: translateX(-45%);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
