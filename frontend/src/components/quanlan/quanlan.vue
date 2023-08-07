<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div id="bg-wave">

    </div>
    <div class="nav1">
      <navbar1></navbar1>
    </div>
    <div class="header">语音全览</div>

    <div class="lines">
      <img src="@/components/quanlan/water.svg" class="image" style="width: 2400px; height: 2000px" />
    </div>

    <div class="line2">
      <img src="@/components/quanlan/line.svg" class="image" style="width: 1400px; height: 1200px" />
    </div>

    <div class="shijing"><a href="/quanlan/shijing" @mouseenter="sj = true" @mouseleave="sj = false">诗经</a></div>
    <div class="shijing2" v-if="sj"></div>
    <div class="shijing1" v-else="sj"></div>
    <div class="text1">上古音</div>
    <div class="circle1" v-if="sj">
      <div class="circle11"></div>
    </div>
    <div class="circle12" v-else="sj"></div>
    <div class="intro1" v-show="sj">
      <div class="introText1">简介</div>
      <div class="introText2">
        《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。
      </div>
    </div>
    <div class="pic12" v-if="sj">
      <img src="@/components/quanlan/pic12.svg" class="image" style="width: 650px; height: 500px" />
    </div>
    <div class="pic11" v-else="sj">
      <img src="@/components/quanlan/pic11.svg" class="image" style="width: 650px; height: 500px" />
    </div>

    <div class="guangyun"><a href="/quanlan/guangyun" @mouseenter="gy = true" @mouseleave="gy = false">广韵</a></div>
    <div class="guangyun2" v-if="gy"></div>
    <div class="guangyun1" v-else="gy"></div>
    <div class="text2">中古音</div>
    <div class="circle2" v-if="gy">
      <div class="circle21"></div>
    </div>
    <div class="circle22" v-else="gy"></div>
    <div class="intro2" v-show="gy">
      <div class="intro2Text1">简介</div>
      <div class="intro2Text2">
        《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。
      </div>
    </div>
    <div class="pic22" v-if="gy">
      <img src="@/components/quanlan/pic22.svg" class="image" style="width: 570px; height: 500px" />
    </div>
    <div class="pic21" v-else="gy">
      <img src="@/components/quanlan/pic21.svg" class="image" style="width: 570px; height: 500px" />
    </div>

    <div class="zhongyuan"><a href="/quanlan/zhongyuan" @mouseenter="zy = true" @mouseleave="zy = false">中原音韵</a></div>
    <div class="zhongyuan2" v-if="zy"></div>
    <div class="zhongyuan1" v-else="zy"></div>
    <div class="text3">近代音</div>
    <div class="circle3" v-if="zy">
      <div class="circle31"></div>
    </div>
    <div class="circle32" v-else="zy"></div>
    <div class="intro3" v-show="zy">
      <div class="intro3Text1">简介</div>
      <div class="intro3Text2">
        《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。
      </div>
    </div>
    <div class="pic32" v-if="zy">
      <img src="@/components/quanlan/pic32.svg" class="image" style="width: 900px; height: 700px" />
    </div>
    <div class="pic31" v-else="zy">
      <img src="@/components/quanlan/pic31.svg" class="image" style="width: 900px; height: 700px" />
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

.lines {
  position: fixed;
  z-index: 1;
  top: -350px;
  left: -560px;
}

.line2 {
  position: fixed;
  z-index: 1;
  top: -100px;
  left: 0px;
}

.pic11,
.pic12 {
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0px;
}

.pic21,
.pic22 {
  position: fixed;
  z-index: 1;
  top: 220px;
  left: 830px;
}

.pic31,
.pic32 {
  position: fixed;
  z-index: 1;
  top: 320px;
  left: 50px;
}

.shijing1 {
  position: fixed;
  z-index: 99;
  top: 180px;
  left: 470px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
}

.shijing2 {
  position: fixed;
  z-index: 99;
  top: 180px;
  left: 470px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.shijing a {
  position: fixed;
  z-index: 899;
  top: 215px;
  left: 475px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}

.text1 {
  position: fixed;
  z-index: 99;
  top: 370px;
  left: 200px;
  font-size: 20px;
}

.circle11 {
  position: fixed;
  z-index: 999;
  top: 322px;
  left: 217px;
  width: 22px;
  height: 22px;
  background-color: #e88149;
  border-radius: 50%;
}

.circle1 {
  position: fixed;
  z-index: 100;
  top: 308px;
  left: 203px;
  width: 50px;
  height: 50px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}

.circle12 {
  position: fixed;
  z-index: 100;
  top: 320px;
  left: 210px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}

.intro1 {
  position: fixed;
  z-index: 100;
  top: 180px;
  left: 550px;
  width: 550px;
  height: 330px;
  background-color: #f9f5f2;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.introText1 {
  position: fixed;
  z-index: 100;
  top: 200px;
  left: 820px;
  font-size: 20px;
}

.introText2 {
  position: fixed;
  z-index: 100;
  top: 280px;
  left: 800px;
  width: 270px;
  height: 330px;
}

.guangyun a {
  position: fixed;
  z-index: 999;
  top: 315px;
  left: 1220px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}

.guangyun1 {
  position: fixed;
  z-index: 99;
  top: 280px;
  left: 1213px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
}

.guangyun2 {
  position: fixed;
  z-index: 99;
  top: 280px;
  left: 1213px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.text2 {
  position: fixed;
  z-index: 99;
  top: 570px;
  left: 1050px;
  font-size: 20px;
}

.circle21 {
  position: fixed;
  z-index: 999;
  top: 541px;
  left: 1009px;
  width: 22px;
  height: 22px;
  background-color: #e88149;
  border-radius: 50%;
}

.circle2 {
  position: fixed;
  z-index: 100;
  top: 527px;
  left: 995px;
  width: 50px;
  height: 50px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}

.circle22 {
  position: fixed;
  z-index: 100;
  top: 540px;
  left: 1010px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}

.intro2 {
  position: fixed;
  z-index: 100;
  top: 150px;
  left: 650px;
  width: 550px;
  height: 330px;
  background-color: #f9f5f2;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.intro2Text1 {
  position: fixed;
  z-index: 100;
  top: 170px;
  left: 900px;
  font-size: 20px;
}

.intro2Text2 {
  position: fixed;
  z-index: 100;
  top: 260px;
  left: 900px;
  width: 270px;
  height: 330px;
}

/* 中原音韵 */
.zhongyuan a {
  position: fixed;
  z-index: 999;
  top: 515px;
  left: 380px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}

.zhongyuan1 {
  position: fixed;
  z-index: 99;
  top: 500px;
  left: 375px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 140px;
  width: 50px;
  border-radius: 5px;
}

.zhongyuan2 {
  position: fixed;
  z-index: 99;
  top: 500px;
  left: 375px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  height: 140px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.text3 {
  position: fixed;
  z-index: 99;
  top: 600px;
  left: 685px;
  font-size: 20px;
}

.circle31 {
  position: fixed;
  z-index: 999;
  top: 654px;
  left: 724px;
  width: 22px;
  height: 22px;
  background-color: #e88149;
  border-radius: 50%;
}

.circle3 {
  position: fixed;
  z-index: 100;
  top: 640px;
  left: 710px;
  width: 50px;
  height: 50px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}

.circle32 {
  position: fixed;
  z-index: 100;
  top: 650px;
  left: 725px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}

.intro3 {
  position: fixed;
  z-index: 990;
  top: 250px;
  left: 500px;
  width: 550px;
  height: 330px;
  background-color: #f9f5f2;
  border-radius: 5px;
  border: 3px solid #e88149;
}

.intro3Text1 {
  position: fixed;
  z-index: 999;
  top: 270px;
  left: 750px;
  font-size: 20px;
}

.intro3Text2 {
  position: fixed;
  z-index: 999;
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
</style>