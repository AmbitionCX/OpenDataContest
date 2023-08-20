<template>
  <div class="title2">
    <img src="@/assets/introduction/title2.svg" class="image" />
  </div>
  <div class="Shijing1" ><a>汉语韵律之美</a></div>

  <div class="china1">
    <img src="@/assets/introduction/china-kuang.svg" class="image" />
  </div>

  <div class="china2">
    <a>今天用汉语普通话演唱流行音乐————《我的中国心》</a>
    <br>
    <a>“近”“心”“身”“印”“斤”“亲”“音”等字押韵，在演唱中，汉语的韵脚字循环往复，声律和谐，余音绕梁。无论音乐旋律还是语音押韵，汉语都在追求一种听觉上的规律和美感。</a>
  </div>

  <div class="china3">
    <img src="@/assets/introduction/china-shan.svg" class="image" />
  </div>

</template>
        
    <script>
export default {
  data() {
    return {

    };
  },
  components: {

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
  /* background-color: #f9f5f2;
    z-index: -1; */
}
.title2 {
  position: absolute;
  z-index: 99;
  top: 150vh;
  left: 10vw;
  width: 15vw;
  height: 50vh;
  transform: scaleX(1) scaleY(1.2); /* 水平缩放50%，垂直缩放70% */
}
.Shijing1 {
    position: absolute;
      z-index: 999;
      top: 158.5vh;
      left: 16vw;
}
.Shijing1 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.china1 {
position: absolute;
  z-index: 999999;
  top: 150vh;
  left: 17vw;
  width: 35vw;
    height: 120vh;
  /* transform: scaleX(1) scaleY(1.2);  */
}
.china2 {
    position: absolute;
  z-index: 999999;
  top: 150vh;
  left: 60vw;
 width: 25vw;
  height: 40vh;
  background-image: linear-gradient(to left, rgba(198, 145, 14, 1),
      rgba(252, 237, 227, 0.1));
  border-radius: 5px;
display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
flex-direction: column;
  align-items: flex-start; 
  justify-content: center; 
}
.china2 a {
    color: #000;
  font-size: 20px;
}
.china3 {
position: absolute;
  z-index: 999999;
  top: 200vh;
  left: 55vw;
  width: 40vw;
  height: 30vh;
  /* transform: scaleX(0.3) scaleY(0.3);  */
}
</style>