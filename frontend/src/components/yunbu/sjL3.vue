<template>
<div class="header">韵部系联</div>

<div class="btn1">
  <div class="left1"></div>
  <div class="left2"></div>
</div>

<div class="shijing"><a>诗经</a></div>
<div class="btn2"></div>
</template>

<script>
import axios from "axios";

</script>

<style scoped>

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
    rgba(193, 165, 48, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 40px;
  width: 50px;
  border: 3px solid #c1a530;
}
.left1 {
  background-color: #f9f5f2;
  height: 8px;
  width: 8px;
  position: fixed;
  top: 140px;
  left: 67px;
}
.left2 {
  background-color: #f9f5f2;
  height: 2px;
  width: 20px;
  position: fixed;
  top: 143px;
  left: 80px;
}
.shijing a {
  position: fixed;
  z-index: 899;
  top: 210px;
  left: 68px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.btn2 {
  position: fixed;
  z-index: 99;
  top: 175px;
  left: 60px;
  background-image: linear-gradient(
    rgba(193, 165, 48, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 140px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c1a530;
}

</style>