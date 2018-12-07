<template>
  <div id="app">
    <!-- <mAbout></mAbout> -->
    <router-view/>
  </div>
</template>

<script>
// import mAbout from "@/blog/components/About.vue";
export default {
  //   components: { mAbout },
  name: "App"
};
</script>

<style>
@import "./assets/css/reset.css";
@import "./assets/css/media_grid.css";
@import "./assets/css/code.css";
</style>
