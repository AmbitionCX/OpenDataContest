<template>
  <div class="bg" style="background-color: #f9f5f2">

    <div class="lines">
      <img
        src="@/components/shouye/background.png"
        class="image"
        style="width: 100vw; height: 100vh"
      />
    </div>

    <div class="kaishi-container1">
    <div class="kaishi">
      <img
        src="@/components/shouye/button.svg"
        class="image"
        @click="this.$router.push('/introduction')"
      />
    </div>
  </div>

  <div class="kaishi-container2"  @click="this.$router.push('/introduction')">
  <a>开</a><a>启</a><a>音</a><a>旅</a>
</div>

<div class="juanzhou-container1">
    <div class="juanzhou">
      <img
        src="@/components/shouye/juanzhou.svg"
        class="image"
        style="width: 350px; "
      />
    </div>
  </div>

  <div class="juanzhou-container2">
  <span v-for="(char,index) in txt" class="juanzhou-txt">
    <span>{{ char }}</span>
  </span>
</div>

<div class="title-txt">
<div class="txt1">文</div>
<div class="txt2">藻</div>
<div class="txt3">声</div>
<div class="txt4">韵</div>
</div>

  </div>
</template>
  
  <script>
export default {
  data() {
    return {
        txt : '古汉语典籍韵部流变',
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
  
  <style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.kaishi-container1 {
  position: absolute;
  top: 60vh;
  left: 0;
  width: 100vw;
  height: 20vh;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.kaishi {
  z-index: 9;
  width: 10vw; 
  height: 10vh; 
}
.kaishi-container2 {
  position: absolute;
  top: 66vh;
  left: 45vw;
  width: 10vw;
  height: 30px;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 99;
  cursor: pointer;
}
.kaishi-container2 a {
  font-size: 20px;
  background-image: linear-gradient(
    to left,
    rgb(72, 68, 64, 1),
    rgb(252, 237, 227, 0.3)
  );
  color: transparent;
  -webkit-background-clip: text;
}
.juanzhou-container1 {
  position: absolute;
  top: 36vh;
  left: 0;
  width: 100vw;
  height: 20vh;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items:flex-start; /* 垂直居中 */
  z-index: 9;
}
.juanzhou-container2 {
  position: absolute;
  top: 40vh;
  left: 0;
  width: 100vw;
  height: 16.8vh;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: end; /* 垂直居中 */
  z-index: 9;
  padding-right: 1vw;
}
.juanzhou-txt {
  z-index: 99;
  font-size: 20px;
  background-image: linear-gradient(
    to left,
    rgb(72, 68, 64, 1),
    rgb(252, 237, 227, 0.3)
  );
  color: transparent;
  -webkit-background-clip: text;
}
.square {
  position: fixed;
  z-index: 99;
  width: 300px;
  height: 300px;
  background-color: #f9f5f2;
  transition: transform 1s ease-in-out;
}
.lines{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0px;
  left: 0px;
}
.title-txt div{
  z-index: 9999;
  font-size: 40px;
  background-image: linear-gradient(
    to left,
    rgb(72, 68, 64, 1),
    rgb(252, 237, 227, 0.3)
  );
  color: transparent;
  -webkit-background-clip: text;
}
.txt1 {
  position: absolute;
  top: calc(36vh + 55px);
  left: 42vw;
}
.txt2 {
  position: absolute;
  top: calc(36vh + 40px);
  left: 47vw;
}
.txt3 {
  position: absolute;
  top: calc(36vh + 55px);
  left: 52vw;
}
.txt4 {
  position: absolute;
  top: calc(36vh + 80px);
  left: 55vw;
}
</style>