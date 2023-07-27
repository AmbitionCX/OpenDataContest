<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar1></navbar1>
    </div>
    <div class="header">语音全览</div>

    <div class="btn1">
      <div class="left1"></div>
      <div class="left2"></div>
    </div>

    <div class="shijing"><a>广韵</a></div>
    <div class="btn2"></div>


  </div>
</template>
        
    <script>
import navbar from "@/components/navbar.vue";
import navbar1 from "@/components/nav/navbar1.vue";
import * as d3 from "d3";
import axios from "axios";

export default {
  data() {
    return {
      sj: false,
    };
  },
  components: {
    navbar,
    navbar1,
  },
  methods: {},
};
</script>
        
    <style>
* {
  /* 内外边距为0 */
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  /* 各种列表样式为空 */
  text-decoration: none;
  list-style: none;
}
.nav1 {
  position: fixed;
  z-index: 99;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.header {
  position: fixed;
  z-index: 999;
  top: 5px;
  left: 47vw;
  font-size: 30px;
  color: #f6f5f5;
  text-align: center;
}
.btn1 {
  position: fixed;
  top: 125px;
  left: 60px;
  background-image: linear-gradient(
    to right,
    rgba(232, 129, 73, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 40px;
  width: 50px;
  border: 3px solid #e88149;
}
.left1{
  background-color: #f9f5f2;
  height: 8px;
  width: 8px;
  position: fixed;
  top: 140px;
  left: 67px;
}
.left2{
  background-color: #f9f5f2;
  height: 2px;
  width: 20px;
  position: fixed;
  top: 143px;
  left: 80px;
}
.shijing a{
  position: fixed;
  z-index: 899;
  top: 210px;
  left: 68px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.btn2{
  position: fixed;
  z-index: 99;
  top: 175px;
  left: 60px;
  background-image: linear-gradient(
    rgba(232, 129, 73, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 140px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
}
</style>