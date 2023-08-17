<template>
  <div class="shijing"><a>广韵</a></div>

  <div>
    <a href="/quanlan/shijing"><div class="cir1"></div></a>
    <div class="line1"></div>
    <div class="cir11"></div>
    <div class="cir12"></div>
    <!-- <div class="line2"></div> -->
    <div class="line3"></div>
    <a href="/quanlan/zhongyuan"><div class="cir3"></div></a>
  </div>
</template>

<style scoped>
.cir1 {
  position: fixed;
  z-index: 100;
  top: 125px;
  left: 63px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}
.cir11 {
  position: fixed;
  top: 330px;
  left: 55px;
  width: 45px;
  height: 45px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 6px solid #e88149;
}
.cir12 {
  position: fixed;
  z-index: 999;
  top: 342px;
  left: 68px;
  width: 20px;
  height: 20px;
  background-color: #e88149;
  border-radius: 50%;
}
.line1 {
  position: fixed;
  top: 155px;
  left: 75px;
  height: 180px;
width: 5px;
background-color: #e88149;
}
.line2 {
  position: fixed;
  top: 330px;
  left: 75px;
  height: 25px;
width: 5px;
background-color: #e88149;
}
.cir2 {
  position: fixed;
  z-index: 100;
  top: 353px;
  left: 63px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}
.line3 {
  position: fixed;
  z-index: 1;
  top: 373px;
  left: 75px;
  height: 178px;
width: 5px;
background-color: #e88149;
}
.cir3 {
  position: fixed;
  z-index: 100;
  top: 550px;
  left: 63px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}
.shijing {
position: fixed;
z-index: 9999;
top: 390px;
left: 51px;
background-image: linear-gradient(
  rgba(232, 129, 73, 1),
  rgba(252, 237, 227, 0.1)
);
height: 140px;
width: 50px;
border-radius: 5px;
border: 3px solid #e88149;
display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
align-items: center; /* 垂直居中文本 */
justify-content: center; /* 水平居中文本 */
}
.shijing a {
writing-mode: vertical-lr;
letter-spacing: 0.3em;
font-size: 23px;
color: black;
}
</style>