<template>
  <div class="quanlan-container">
    <!-- <div id="bg-wave"></div> -->

    <!-- <div class="lines">
      <img src="@/assets/quanlan/water.svg" class="image" style="width: 100vw; height: 100vh" />
    </div> -->

    <div class="line2">
      <img src="@/assets/quanlan/line3.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>

    <div class="shijing2" v-if="sj"><a href="/quanlan/shijing" @mouseenter="sj = true" @mouseleave="sj = false">诗经</a></div>
    <div class="shijing1" v-else><a href="/quanlan/shijing" @mouseenter="sj = true" @mouseleave="sj = false">诗经</a></div>
    <div class="text1">上古音</div>

    <div class="circle11" v-if="sj">
      <img src="@/assets/quanlan/cir12.svg" class="image" style="width: 3vw; height: 3vw" />
    </div>
    <div class="circle12" v-else>
      <img src="@/assets/quanlan/cir11.svg" class="image" style="width: 2.3vw; height: 2.3vw" />
    </div>

    <div class="intro1" v-show="sj">
      <div class="introText1">简介</div>
      <div class="introText2">
        《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。
      </div>
    </div>
    <div class="pic12" v-if="sj">
      <img src="@/assets/quanlan/pic12.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>
    <div class="pic11" v-else>
      <img src="@/assets/quanlan/pic11.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>

    <div class="guangyun2" v-if="gy"><a href="/quanlan/guangyun" @mouseenter="gy = true" @mouseleave="gy = false">广韵</a></div>
    <div class="guangyun1" v-else><a href="/quanlan/guangyun" @mouseenter="gy = true" @mouseleave="gy = false">广韵</a></div>
    <div class="text2">中古音</div>

    <div class="circle21" v-if="gy">
      <img src="@/assets/quanlan/cir22.svg" class="image" style="width: 3vw; height: 3vw" />
    </div>
    <div class="circle22" v-else>
      <img src="@/assets/quanlan/cir21.svg" class="image" style="width: 2.3vw; height: 2.3vw" />
    </div>

    <div class="intro2" v-show="gy">
      <div class="intro2Text1">简介</div>
      <div class="intro2Text2">
        《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。
      </div>
    </div>
    <div class="pic22" v-if="gy">
      <img src="@/assets/quanlan/pic22.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>
    <div class="pic21" v-else>
      <img src="@/assets/quanlan/pic21.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>

    <div class="zhongyuan2" v-if="zy"><a href="/quanlan/zhongyuan" @mouseenter="zy = true" @mouseleave="zy = false">中原音韵</a></div>
    <div class="zhongyuan1" v-else><a href="/quanlan/zhongyuan" @mouseenter="zy = true" @mouseleave="zy = false">中原音韵</a></div>
    <div class="text3">近代音</div>

    <div class="circle31" v-if="zy">
      <img src="@/assets/quanlan/cir32.svg" class="image" style="width: 3vw; height: 3vw" />
    </div>
    <div class="circle32" v-else>
      <img src="@/assets/quanlan/cir31.svg" class="image" style="width: 2.3vw; height: 2.3vw" />
    </div>

    <div class="intro3" v-show="zy">
      <div class="intro3Text1">简介</div>
      <div class="intro3Text2">
        《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。
      </div>
    </div>
    <div class="pic32" v-if="zy">
      <img src="@/assets/quanlan/pic32.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>
    <div class="pic31" v-else>
      <img src="@/assets/quanlan/pic31.svg" class="image" style="width: 90vw; height: 100vh" />
    </div>

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
      gy: false,
      zy: false,
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
.lines {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.line2 {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}

.pic11,
.pic12 {
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
}

.pic21,
.pic22 {
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
}

.pic31,
.pic32 {
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
}

.shijing1 {
  position: absolute;
  z-index: 99;
  top: 22vh;
  left: 32vw;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}

.shijing2 {
  position: absolute;
  z-index: 99;
  top: 22vh;
  left: 32vw;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}

.shijing1 a, .shijing2 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}

.text1 {
  position: absolute;
  z-index: 99;
  top: 44vh;
  left: 13vw;
  font-size: 20px;
}

.circle11, .circle12 {
  position: absolute;
  z-index: 999;
  top: 39vh;
  left: 14.5vw;
}

.intro1 {
  position: absolute;
  z-index: 9999;
  top: 180px;
  left: 550px;
  width: 550px;
  height: 330px;
  background-color: #f9f5f2;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.introText1 {
  position: absolute;
  z-index: 999999;
  top: 200px;
  left: 820px;
  font-size: 20px;
}

.introText2 {
  position: absolute;
  z-index: 99999;
  top: 280px;
  left: 800px;
  width: 270px;
  height: 330px;
}

.guangyun1 {
  position: absolute;
  z-index: 99;
  top: 32vh;
  left: 77vw;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}

.guangyun2 {
  position: absolute;
  z-index: 99;
  top: 32vh;
  left: 77vw;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}

.guangyun1 a, .guangyun2 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}

.text2 {
  position: absolute;
  z-index: 99;
  bottom: 30vh;
  right: 20vw;
  font-size: 20px;
}

.circle21, .circle22 {
  position: absolute;
  z-index: 999;
  top: 61vh;
  left: 65vw;
}

.intro2 {
  position: absolute;
  z-index: 100;
  top: 150px;
  left: 470px;
  width: 550px;
  height: 330px;
  background-color: #f9f5f2;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.intro2Text1 {
  position: absolute;
  z-index: 100;
  top: 170px;
  left: 900px;
  font-size: 20px;
}

.intro2Text2 {
  position: absolute;
  z-index: 100;
  top: 260px;
  left: 900px;
  width: 270px;
  height: 330px;
}

/* 中原音韵 */
.zhongyuan1 {
  position: absolute;
  z-index: 99;
  top: 58vh;
  left: 23vw;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 140px;
  width: 50px;
  border-radius: 5px;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}

.zhongyuan2 {
  position: absolute;
  z-index: 99;
  top: 58vh;
  left: 23vw;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 140px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}

.zhongyuan1 a, .zhongyuan2 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}

.text3 {
  position: absolute;
  z-index: 99;
  top: 67vh;
  left: 44vw;
  font-size: 20px;
}

.circle31, .circle32 {
  position: absolute;
  z-index: 999;
  top: 73vh;
  left: 47vw;
}

.intro3 {
  position: absolute;
  z-index: 999;
  top: 250px;
  left: 450px;
  width: 550px;
  height: 330px;
  background-color: #f9f5f2;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.intro3Text1 {
  position: absolute;
  z-index: 9999;
  top: 270px;
  left: 750px;
  font-size: 20px;
}

.intro3Text2 {
  position: absolute;
  z-index: 9999;
  top: 360px;
  left: 750px;
  width: 270px;
  height: 330px;
}

#bg-wave {
  height: 40vh;
  width: 100%;
  background-image: url("@/assets/wave.png");
  background-size: cover;
  -webkit-animation: slidein 10s infinite linear;
  animation: slidein 10s infinite linear;

  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;

  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}

@-webkit-keyframes slidein {
  from {
    background-position: top;
  }

  to {
    background-position: 100vw 0vw;
  }
}

@keyframes slidein {
  from {
    background-position: top;
  }

  to {
    background-position: 100vw 0vw;
  }

}
.scrollable-container {
position: relative; /* 使用相对定位 */
}
</style>