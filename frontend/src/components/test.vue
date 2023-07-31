<template>
  <div class="container">
    <div class="left">
      <div class="nav1">
      <navbar2></navbar2>
    </div>
    <div class="header">韵部系联</div>

    <div class="intro">
      <div class="intro1">文字简介:</div>
      <div class="rect1"></div>
      <div class="pic">
        <img
          src="@/components/yunbu/shan.svg"
          class="image"
          style="width: 380px; height: 300px"
        />
      </div>
      <div class="shijing1" v-show="!sj"></div>
      <div class="shijing2" v-show="!gy"></div>
      <div class="shijing3" v-show="!zy"></div>

        <div class="shijing" v-show="!sj">诗经</div>
        <div class="shijing" v-show="!gy">广韵</div>
        <div class="zyyy" v-show="!zy">中原音韵</div>

      <div class="rect2"></div>
      <div class="txt">
        <a class="txt1" @click="sj=false, gy=true, zy=true" v-show="sj" href="/yunbu">诗经</a>
        <a class="txt2" @click="gy=false, sj=true, zy=true" v-show="gy" href="/yunbu2">广韵</a>
        <a class="txt3" @click="zy=false, sj=true, gy=true" v-show="zy" href="/yunbu3">中原音韵</a>
      </div>
      <div class="circle12" v-if="sj"></div>
      <div class="circle1" v-else="sj"><div class="circle11"></div></div>
      <div class="circle2" v-if="!gy"><div class="circle21"></div></div>
    <div class="circle22" v-else="!gy"></div>
    <div class="circle3" v-if="!zy"><div class="circle31"></div></div>
    <div class="circle32" v-else="!zy"></div>

    <div class="intro2">文字简介:</div>
    <div class="rect3"></div>
    </div>
    </div>

    <div class="right">
      <div class="scrollable">
        <sjyunbu></sjyunbu>
      </div>
    </div>
    
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import navbar2 from "@/components/nav/navbar2.vue";
import sjyunbu from "@/components/yunbu/sjyunbu.vue";
import * as d3 from "d3";
import axios from "axios";

export default {
  data() {
    return {
        sj: false,
        gy: true,
        zy: true,
    };
  },
  components: {
    navbar,
    navbar2,
    sjyunbu,
  },
  methods: {},
};
</script>

<style>
.container {
  display: flex;
  background-color: #f9f5f2;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.left {
  flex: 1; /* 左侧部分占据一定宽度 */
}

.right {
  flex: 2; /* 右侧部分占据剩余宽度 */
  overflow-x: auto; /* 添加横向滚动条 */
}

.scrollable {
  width: 1000px; /* 右侧滚动内容的宽度，根据实际情况设置 */
  white-space: nowrap; /* 防止内容换行 */
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
.intro {
  position: fixed;
  top: 120px;
  left: 50px;
}
.intro1 {
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect1 {
  position: fixed;
  top: 160px;
  left: 50px;
  height: 60px;
  width: 380px;
  background-color: #dedede;
  border-radius: 10px;
}
.pic {
  position: fixed;
  top: 190px;
  left: 50px;
  z-index: 899;
}
.shijing1 {
  position: fixed;
  z-index: 99;
  top: 240px;
  left: 270px;
  background-image: linear-gradient(
    rgba(198, 145, 14, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c6910e;
}
.shijing2 {
  position: fixed;
  z-index: 99;
  top: 240px;
  left: 270px;
  background-image: linear-gradient(
    rgba(224, 157, 10, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e09d0a;
}
.shijing3 {
  position: fixed;
  z-index: 99;
  top: 240px;
  left: 270px;
  background-image: linear-gradient(
    rgba(193, 165, 48, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c1a530;
}
.shijing {
  position: fixed;
  z-index: 999;
  top: 280px;
  left: 275px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.zyyy {
  position: fixed;
  z-index: 999;
  top: 250px;
  left: 275px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.rect2 {
  position: fixed;
  top: 470px;
  top: 470px;
  height: 10px;
  width: 340px;
  background-image: linear-gradient(
    to right,
    rgba(198, 145, 14, 1),
    rgba(252, 237, 227, 0.1)
  );
}
.txt {
  position: fixed;
  top: 500px;
  left: 35px;
}
.txt a{
    color: #000;
    font-size: 20px;
}
.txt1{
    position: fixed;
    left: 35px;
}
.txt2{
    position: fixed;
    left: 200px;
}
.txt3{
    position: fixed;
    left: 350px;
}
.circle11 {
  position: fixed;
  z-index: 999;
  top: 462px;
  left: 36.5px;
  width: 22px;
  height: 22px;
  background-color: #c6910e;
  border-radius: 50%;
}
.circle1 {
  position: fixed;
  z-index: 100;
  top: 455px;
  left: 30px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #c6910e;
}
.circle12{
  position: fixed;
  z-index: 100;
  top: 460px;
  left: 40px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #c6910e;
}
.circle21 {
  position: fixed;
  z-index: 999;
  top: 462px;
  left: 206.5px;
  width: 22px;
  height: 22px;
  background-color: #e09d0a;
  border-radius: 50%;
}
.circle2 {
  position: fixed;
  z-index: 100;
  top: 455px;
  left: 200px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #e09d0a;
}
.circle22{
  position: fixed;
  z-index: 100;
  top: 460px;
  left: 210px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #e09d0a;
}
.circle31 {
  position: fixed;
  z-index: 999;
  top: 462px;
  left: 366.5px;
  width: 22px;
  height: 22px;
  background-color: #c1a530;
  border-radius: 50%;
}
.circle3 {
  position: fixed;
  z-index: 100;
  top: 455px;
  left: 360px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #c1a530;
}
.circle32{
  position: fixed;
  z-index: 100;
  top: 460px;
  left: 370px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #c1a530;
}
.intro2 {
  position: fixed;
  top: 560px;
  left: 50px;
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect3 {
  position: fixed;
  top: 600px;
  left: 50px;
  height: 200px;
  width: 380px;
  background-color: #dedede;
  border-radius: 20px;
}
</style>
