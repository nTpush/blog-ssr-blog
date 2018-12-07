<template>
  <div :class="$style['close']">
    <div :class="$style['container']">
      <span :class="$style['symbol']" @click="$router.go(-1)">✘</span>
    </div>
  </div>
</template>
<style module lang="postcss">
.close {
  background: red;
  overflow: hidden;
  margin-bottom: 30px;
}
.container {
  position: fixed;
  width: 100%;
  z-index: 99;
  height: 10px;
  text-align: right;
  display: none;
}
.symbol {
  font-size: 24px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: inline-block;
  text-align: center;
  line-height: 40px;
  margin-top: 20px;
  position: relative;
  color: #68768f;
}
.symbol::after {
  content: "";
  display: block;
  width: 2px;
  height: 20px;
  background: #dce4f2;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
.symbol::before {
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  background: #68768f;
  position: absolute;
  top: -20px;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 9;
}

@media (min-width: 768px) {
  .container {
    text-align: center;
    display: block;
  }
  .symbol {
    margin-left: 300px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
