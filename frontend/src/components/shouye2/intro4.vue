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
  
      <div class="intro1" v-show="sj"></div>
      <div class="introText1" v-show="sj">简介</div>
        <div class="introText2" v-show="sj">
          《诗经》是中国最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇。《诗经》的韵文是研究上古音系的重要材料，可以通过系联韵脚字从而研究上古汉语的韵部和声调。
        </div>
        <div class="intropic1-container">
        <div class="intropic1" v-show="sj">
        <img src="@/assets/quanlan/pic1.png" class="image"/>
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
  
      <div class="intro2" v-show="gy"></div>
      <div class="intro2Text1"  v-show="gy">简介</div>
        <div class="intro2Text2" v-show="gy">
          《广韵》是北宋陈彭年、丘雍为增广《切韵》而作的韵书，成书于公元1008年（北宋真宗大中祥符元年）。现存最古的韵书是《广韵》，《广韵》的前身是《唐韵》，《唐韵》的前身是《切韵》。《广韵》基本上保存了《切韵》的语音系统，是研究中古汉语音系的重要材料。《切韵》是隋代陆法言所著，书成于隋仁寿元年（公元601年）。
        </div>
        <div class="intropic2-container" v-show="gy">
        <div class="intropic2">
        <img src="@/assets/quanlan/pic2.png" class="image"/>
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
      </div>
      <div class="intro3Text1"  v-show="zy">简介</div>
        <div class="intro3Text2"  v-show="zy">
          《中原音韵》由元代中期江西人周德清（1277-1365）所编，是为作元曲而编的韵书。《中原音韵》在韵书制作上直接影响到后來的曲韵，开曲韵、词韵之先河。该书被目为北音之祖，所描写的是元代的北方方言语音。在编排体例上打破“以调统韵”的传统韵书体例，不按《广韵》206韵框架，而是以韵统调，根据实际语音将全书所收字编为19韵部，韵下分排四声，声调之下分别同音字组，韵字之下不加注释。《中原音韵》是研究近代汉语音系的重要材料。
        </div>
        <div class="intropic3-container" v-show="zy">
        <div class="intropic3">
        <img src="@/assets/quanlan/pic3.png" class="image"/>
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
    z-index: 999;
    top: 180px;
    left: calc(32vw + 100px);
    width: 550px;
    height: 330px;
    background-color: #f9f5f2;
    border-radius: 5px;
    border: 3px solid #e88149;
  }
  
  .introText1 {
    position: absolute;
    z-index: 9999;
    top: 200px;
    left: calc(32vw + 350px);
    font-size: 20px;
  }
  
  .introText2 {
    position: absolute;
    z-index: 99999;
    top: 280px;
    left: calc(32vw + 350px);
    width: 270px;
  height: 330px;
  text-align: left;
  }
  .intropic1-container {
  position: absolute;
z-index: 99999;
top: 200px;
left: calc(32vw + 120px);
width: 200px;
height: 300px;
display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  /* background-color: aqua; */
}
.intropic1 {
  position: absolute;
z-index: 9;
transform: scaleX(0.5) scaleY(0.5);
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
    right: calc(13vw + 80px);
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
  right: calc(13vw + 320px);
  font-size: 20px;
  }
  
  .intro2Text2 {
    position: absolute;
  z-index: 100;
  top: 230px;
  right: calc(13vw + 100px);
  width: 270px;
  height: 330px;
  text-align: left;
  }
  .intropic2-container {
  position: absolute;
z-index: 99999;
top: 160px;
right: calc(13vw + 380px);
width: 230px;
height: 310px;
display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  /* background-color: aqua; */
}
.intropic2 {
  position: absolute;
z-index: 9;
transform: scaleX(0.6) scaleY(0.6);
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
    left: calc(23vw + 100px);
    width: 630px;
    height: 330px;
    background-color: #f9f5f2;
    border-radius: 5px;
    border: 3px solid #e88149;
  }
  
  .intro3Text1 {
    position: absolute;
  z-index: 999;
  top: 270px;
  left: calc(23vw + 370px);
  font-size: 20px;
  }
  
  .intro3Text2 {
    position: absolute;
  z-index: 9999;
  top: 330px;
  left: calc(23vw + 370px);
  width: 350px;
  height: 250px;
  text-align: left;
  }
  .intropic3-container {
  position: absolute;
z-index: 99999;
top: 260px;
left: calc(23vw + 110px);
width: 240px;
height: 310px;
display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  /* background-color: aqua; */
}
.intropic3 {
  position: absolute;
z-index: 9;
transform: scaleX(0.6) scaleY(0.6);
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