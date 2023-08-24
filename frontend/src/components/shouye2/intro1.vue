<template>
  
        <div class="shanshui">
        <img
          src="@/components/shouye/background.png"
          class="image"
          style="width: 100vw; height: 100vh"
        />
      </div>
  
        <div class="txt">
            <!-- <img src="@/assets/introduction/txt.svg" class="image"/> -->
            <span>文 藻 声 韵</span>
        </div>

      <div class="Title-container">
        <div class="left-rect"></div>
        <span v-for="(char,index) in titleTxt" class="Title-txt">
          <span>{{ char }}</span>
        </span>
        <div class="right-rect"></div>
      </div>
  
        <div class="txt2">
          &nbsp; &nbsp; &nbsp; 古希腊文明、苏美尔文明以及古巴比伦文明在历史的长河中逐渐消逝。然而，中华文明却自古延绵至今，历久弥新。从最早的甲骨卜辞和钟鼎铭文，到后来的简帛书写和线装书卷，这些横跨时光的古籍，无疑是中华文明漫长历程中的珍贵见证。
        </div>

        <div class="line">
            <img src="@/assets/introduction/line.svg" class="image"/>
        </div>

        <div class="btn2">
            <img src="@/assets/introduction/btn1.svg" class="image"/>
        </div>

        <div class="btn1" @click="pic11=!pic11, pic12=!pic12, pic21=!pic21, pic22=!pic22">
            <img src="@/assets/introduction/btn2.svg" class="image"/>
        </div>

        <div class="btn3" @click="pic33=!pic33, pic32=!pic32, pic23=!pic23, pic22=!pic22">
            <img src="@/assets/introduction/btn2.svg" class="image"/>
        </div>
  
        <div class="rect1">
            <img src="@/assets/introduction/rect1.svg" class="image"/>
        </div>
  
        <div class="rect2">
            <img src="@/assets/introduction/rect2.svg" class="image"/>
        </div>
  
        <div class="rect3">
            <img src="@/assets/introduction/rect3.svg" class="image"/>
        </div>
  
        <div class="pic1-container">
  <div class="pic1">
      <img src="@/assets/introduction/pic1.png" class="image" v-show="pic11"/>
      <img src="@/assets/introduction/pic2.png" class="image" v-show="pic21"/>
      <img src="@/assets/introduction/pic3.png" class="image" v-show="pic31"/>
  </div>
</div>

<div class="pic2-container">
  <div class="pic2">
    <img src="@/assets/introduction/pic1.png" class="image" v-show="pic12"/>
      <img src="@/assets/introduction/pic2.png" class="image" v-show="pic22"/>
      <img src="@/assets/introduction/pic3.png" class="image" v-show="pic32"/>
  </div>
</div>

<div class="pic3-container">
  <div class="pic3">
    <img src="@/assets/introduction/pic1.png" class="image" v-show="pic13"/>
      <img src="@/assets/introduction/pic2.png" class="image" v-show="pic23"/>
      <img src="@/assets/introduction/pic3.png" class="image" v-show="pic33"/>
  </div>
</div>
  
        <div class="title-container">
          <div class="title">
            <img src="@/assets/introduction/title.svg" class="image"/>
            <div class="title-txt">古汉语的语音发展</div>
        </div>
        </div>
  
        <div class="txt3">
          &nbsp; &nbsp; &nbsp; 汉字所蕴含的“形音义”在传承中华文明功不可没。从《诗经》时代一路走来，汉语在一代代中国人的口中不断传承着、创造着、发展着，凝聚成一条川流不息的语言长河。虽然古代缺乏拼音和录音技术，但古人为后人留下了诗歌、韵书，展现了他们对古汉语的语音记录与探索。
        </div>
        
    </template>
        
    <script>
  import navbar from "@/components/navbar.vue";
  import navbar0 from "@/components/nav/navbar0.vue";
    import axios from 'axios';
  
    export default {
    data() {
      return {
        titleTxt : '古汉语典籍韵部流变',
        pic11:true,
        pic21:false,
        pic31:false,
        pic12:false,
        pic22:true,
        pic32:false,
        pic13:false,
        pic23:false,
        pic33:true,
      };
    },
    components:{
      navbar,
      navbar0,
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
  /* .test {
    position: relative;
    top: 90vh;
  } */
  .bg{
    width: 100vw;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
  }
  .nav1 {
    position: fixed;
    z-index: 99;
  }
  .header {
    position: fixed;
    z-index: 9999;
    top: 4px;
    left: 48vw;
    font-size: 25px;
    color: #f6f5f5;
    text-align: center;
  }
  .container {
    position: fixed;
    top: 6vh;
    left: 0;
    width: 100vw;
    height: 94vh;
    overflow: auto;
  }
  .shanshui {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0px;
    left: 0px;
    opacity: 0.5;
  }
  .txt {
    position: absolute;
    z-index: 99;
    top: 10vh;
    left: 0;
    width: 100vw;
    height: 20vh;
    display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  }
  .txt span {
    font-size: 4rem;
    background-image: linear-gradient(
    rgb(198, 145, 14, 1),
    rgb(249, 245, 242, 0.7)
  );
  color: transparent;
  -webkit-background-clip: text;
  }
  .Title-container {
    position: absolute;
    z-index: 9999;
    top: 25vh;
    left: 0;
    width: 100vw;
    height: 10vh;
    display: flex; /* 使用 Flexbox 布局 */
    /* flex-direction: column; */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  }
  .Title-txt {
    font-size: 2rem;
  background-image: linear-gradient(
    to left,
    rgb(72, 68, 64, 1),
    rgb(252, 237, 227, 0.3)
  );
  color: transparent;
  -webkit-background-clip: text;
  }
  .left-rect {
    width: 40px;
    height: 5px;
    margin-right: 20px;
    background-image: linear-gradient(
    to left,
    rgb(72, 68, 64, 1),
    rgb(252, 237, 227, 0.3)
  );
  }
  .right-rect {
    width: 40px;
    height: 5px;
    margin-left: 20px;
    background-image: linear-gradient(
    to right,
    rgb(72, 68, 64, 1),
    rgb(252, 237, 227, 0.3)
  );
  }
  .txt2 {
    position: absolute;
    width: 83vw;
    top: 40vh;
    left: 9vw;
    font-size: 1.3rem;
    text-align: left;
  }
  .line {
    position: absolute;
    z-index: 999;
    top: 108vh;
    left: 15vw;
    width: 70vw;
    height: 10vh;
  }
  .btn2 {
    position: absolute;
    z-index: 999;
    top: 108vh;
    left: 49vw;
    width: 2vw;
    height: 2vw;
    cursor: pointer;
  }
  .btn1 {
    position: absolute;
    z-index: 999;
    top: 108vh;
    left: 25vw;
    width: 2vw;
    height: 2vw;
    cursor: pointer;
  }
  .btn3 {
    position: absolute;
    z-index: 999;
    top: 108vh;
    left: 73vw;
    width: 2vw;
    height: 2vw;
    cursor: pointer;
  }
  .rect1 {
    position: absolute;
    z-index: 9;
    top: 60vh;
    left: 13.5vw;
    width: 23vw;
    height: 50vh;
  }
  .rect2 {
    position: absolute;
    z-index: 9;
    top: 52vh;
    left: 35vw;
    width: 30vw;
    height: 50vh;
  }
  .rect3 {
    position: absolute;
    z-index: 9;
    top: 60vh;
    left: 63vw;
    width: 23vw;
    height: 50vh;
  }
  .pic1-container {
position: absolute;
z-index: 9;
top: 60vh;
left: 13.5vw;
width: 23vw;
height: 50vh;
display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.pic1 {
position: absolute;
z-index: 9;
transform: scaleX(0.8) scaleY(0.9); /* 水平缩放50%，垂直缩放70% */
}
.pic2-container {
position: absolute;
z-index: 9;
top: 52vh;
left: 35vw;
width: 30vw;
height: 50vh;
display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  padding-top: 5vh;
}
.pic2 {
position: absolute;
z-index: 9;
transform: scaleX(0.8) scaleY(0.98); /* 水平缩放50%，垂直缩放70% */
}
.pic3-container {
position: absolute;
z-index: 9;
top: 60vh;
left: 63vw;
width: 23vw;
height: 50vh;
display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.pic3 {
position: absolute;
z-index: 9;
transform: scaleX(1) scaleY(0.85); /* 水平缩放50%，垂直缩放70% */
}
  .title-container {
    display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
    z-index: 9;
    top: 97vh;
    left: 10vw;
    width: 80vw;
    height: 50vh;
  }
  .title {
    /* position: absolute;
    z-index: 9;
    top: 116vh;
    left: 34vw; */
    position: relative;
    text-align: center;
    width: 30vw;
    height: 10vh;
  }
  .title-txt {
    color: #000;
    font-size: 1.3rem;
position: absolute; /* 使用绝对定位 */
  top: 50%; /* 上边缘位于父元素的50%位置 */
  left: 50%; /* 左边缘位于父元素的50%位置 */
  transform: translate(-50%, -110%); /* 使用负的translate来使文本居中 */
  }
  .txt3 {
    position: absolute;
    top: 130vh;
    left: 23vw;
    font-size: 1.3rem;
    width: 54vw;
    text-align: left;
    z-index: 999;
  }
    </style>