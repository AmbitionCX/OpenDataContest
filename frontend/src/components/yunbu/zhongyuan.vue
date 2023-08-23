<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar2></navbar2>
    </div>

    <div class="header">韵部系联</div>

    <div class="lines">
      <img
        src="@/assets/yunbu/background.svg"
        class="image"
        style="width: 100vw; height: 100vh"
      />
    </div>

    <div class="btn1"  @click="BackToLastWeb">
      <div class="left1"></div>
      <div class="left2"></div>
    </div>

    <div class="shijing"><a>中原音韵</a></div>
    <div class="bu"><a>{{ yb[Index] }}部</a></div>
    <div class="intro">文字简介:</div>
    <div class="rect"></div>

    <div class="circle-container">
      <span class="yunbu">{{ yb[Index] }}</span>
    </div>

    <!-- <div class="circle-container">
      <span class="yunbu">{{ yb[Index] }}</span>
      <div
        class="circle-text"
        v-for="(char, index) in text"
        :key="index"
        :style="getTextStyle(index)"
      >
        {{ char }}
      </div>
    </div> -->

    <zyoptions :message="yb[Index]"></zyoptions>

  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import navbar2 from "@/components/nav/navbar2.vue";
import zyoptions from "@/components/yunbu/zyoptions.vue";
import * as d3 from "d3";
import axios from "axios";

export default {
  data() {
    return {
      Index: this.$route.params.index,
      yun: "韵部",
      yb: [],
      yunjiao: [],
      text: [],
      innerRadius: 80, // Radius of the central circle
      gap: 10, // Gap between each circle
      anglePerCharacter: 8, // Adjust the angle per character to control the spiral density
    };
  },
  components: {
    navbar,
    navbar2,
    zyoptions,
  },
  computed: {},
  methods: {
    BackToLastWeb(){
      window.location.href = `/yunbu3/${this.Index}`; 
    },
    async getShijing() {
      return new Promise((resolve, reject) => {
        const path = "/get_jindai_zhongyuan";
         const url = this.$globalUrl + path;

        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            const yunbu = [];
            const yunjiao = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i][1] != "" && res.data[i][1] != 0) {
                yunbu.push(res.data[i][1]);
              }
            }
            const yunbu2 = Array.from(new Set(yunbu));

            for (let i = 0; i < yunbu2.length; i++) {
              yunjiao[i] = [];
            }

            for (let i = 0; i < res.data.length; i++) {
              if (yunbu2.indexOf(res.data[i][1]) != -1) {
                yunjiao[yunbu2.indexOf(res.data[i][1])].push(res.data[i][0]);
              }
            }

            this.yb = yunbu2;
            this.yunjiao = yunjiao;
            this.text = yunjiao[this.Index];
            console.log(this.yunjiao);
            resolve(yunjiao); // 请求成功后resolve数据
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

    getTextStyle(index) {
      const totalCharacters = this.text.length;
      const angle = this.degreesToRadians(index * this.anglePerCharacter);
      const distanceFromCenter = index / 2 + this.innerRadius;
      const x = distanceFromCenter * Math.cos(angle);
      const y = distanceFromCenter * Math.sin(angle);
      const alpha = 1 - index / totalCharacters; // Calculate the alpha (opacity) value based on the index
      return {
        // transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
        position: "absolute",
        left: `${x + 420}px`,
        top: `${y + 420}px`,
        color: `rgba(193, 165, 48, 1)`,
        //color: `rgba(200, 150, 0, ${alpha})`,
      };
    },
    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    },
  },
  created() {
    this.getShijing();
  },
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
.yunbu {
  position: fixed;
  bottom: 10vh;
  left: 28vw;
  font-size: 80px;
  background-image: linear-gradient(
    to right,
    rgb(229, 186, 79, 1),
    rgb(128, 104, 9, 1)
  );
  color: transparent;
  -webkit-background-clip: text;
}
.circle-text {
  position: absolute;
  font-size: 12px;
  white-space: nowrap;
}
.header {
  position: fixed;
  z-index: 999;
  top: 4px;
  left: 47vw;
  font-size: 25px;
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
  cursor: pointer;
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
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.shijing {
  position: fixed;
  z-index: 99;
  top: 175px;
  left: 60px;
  background-image: linear-gradient(
    rgba(193, 165, 48, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 18vh;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c1a530;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}
.bu a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.bu {
  position: fixed;
  z-index: 99;
  top: calc(18vh + 185px);
  left: 60px;
  background-image: linear-gradient(
    rgba(193, 165, 48, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 10vh;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c1a530;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}
.intro {
  position: fixed;
  top: calc(28vh + 225px);
  left: 50px;
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect {
  position: fixed;
  top: calc(28vh + 265px);
  left: 50px;
  height: 35vh;
  width: 15vw;
  background-color: #dedede;
  border-radius: 20px;
  opacity: 0.6;
}
.lines{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
</style>