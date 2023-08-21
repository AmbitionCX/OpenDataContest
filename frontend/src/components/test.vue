<template>
  <div class="title2">
    <img src="@/assets/introduction/title2.svg" class="image" />
  </div>
  <div class="Shijing1" ><a>汉语韵律之美</a></div>

  <div class="china1">
    <img src="@/assets/introduction/china-kuang.svg" class="image" />
  </div>

  <ul class="china-txt">
    <span v-for="(item, index) in zgx">
      <span v-if="item.text === ''" style="color: transparent;">none<br /></span>
      <span v-else>
        <template v-for="(char, charIndex) in item.text">
                <span
                  :class="{ 'red-text': char === item.yunjiao }">
                  {{ char }}
                </span>
        </template><br/>
      </span>
    </span>
  </ul>

  <div class="china2">
    <p>今天用汉语普通话演唱流行音乐————《我的中国心》</p>
    <br>
    <p>“近”“心”“身”“印”“斤”“亲”“音”等字押韵，在演唱中，汉语的韵脚字循环往复，声律和谐，余音绕梁。无论音乐旋律还是语音押韵，汉语都在追求一种听觉上的规律和美感。</p>
  </div>

  <div class="china2-container"></div>

  <div class="china3">
    <img src="@/assets/introduction/china-shan.svg" class="image" />
  </div>

</template>
        
    <script>
export default {
  data() {
    return {
      zgx: [
          {text: '《我的中国心》', yunjiao: ''},
          {text: '', yunjiao: ''},
          {text: '河山只在我梦萦', yunjiao: ''},
          {text: '祖国已多年未亲近', yunjiao: '近'},
          {text: '可是不管怎样也改变不了', yunjiao: ''},
          {text: '我的中国心', yunjiao: '心'},
          {text: '洋装虽然穿在身', yunjiao: '身'},
          {text: '我心依然是中国心', yunjiao: '心'},
          {text: '我的祖先早已把我的一切', yunjiao: ''},
          {text: '烙上中国印', yunjiao: '印'},
          {text: '长江 长城 黄山 黄河', yunjiao: ''},
          {text: '在我心中重千斤', yunjiao: '斤'},
          {text: '无论何时 无论何地', yunjiao: ''},
          {text: '心中一样亲', yunjiao: '亲'},
          {text: '', yunjiao: ''},
          {text: '流在心里的血', yunjiao: ''},
          {text: '澎湃着中华的声音', yunjiao: '音'},
          {text: '就算身在他乡也改变不了', yunjiao: ''},
          {text: '我的中国心', yunjiao: '心'},
          {text: '长江 长城 黄山 黄河', yunjiao: ''},
          {text: '在我心中重千斤', yunjiao: '斤'},
          {text: '无论何时 无论何地', yunjiao: ''},
          {text: '心中一样亲', yunjiao: '亲'},
          {text: '流在心里的血', yunjiao: ''},
          {text: '澎湃着中华的声音', yunjiao: '音'},
          {text: '就算身在他乡也改变不了', yunjiao: ''},
          {text: '我的中国心', yunjiao: '心'},
        ]
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
  z-index: 999;
  top: 150vh;
  left: 17vw;
  width: 35vw;
    height: 120vh;
  /* transform: scaleX(1) scaleY(1.2);  */
}
.china2-container {
    position: absolute;
  z-index: 999;
  top: 150vh;
  left: 57vw;
 width: 27vw;
  height: 40vh;
  background-image: linear-gradient(to left, rgba(198, 145, 14, 1),
      rgba(252, 237, 227, 0.1));
  border-radius: 5px;
}
.china2 {
  position: absolute;
  z-index: 999999;
  top: 155vh;
  left: 57vw;
 width: 25vw;
  height: 40vh;
  text-align: left;
  font-size: 1.3rem;
  color: #000;
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
.china-txt {
  position: absolute;
  z-index: 999;
  top: 152vh;
  left: 30vw;
}
.red-text {
  color: white;
  background-color: #BC3E17;
  display: inline;
  cursor: pointer;
}
</style>