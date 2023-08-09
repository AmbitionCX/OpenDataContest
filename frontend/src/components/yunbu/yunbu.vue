<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="left-pane">
      <!-- 左边内容 -->
      <div class="nav1">
        <navbar2></navbar2>
      </div>
      <div class="header">韵部系联</div>

      <div class="intro">
        <div class="intro1">文字简介:</div>
        <div class="rect1"></div>
        <div class="pic">
          <img
            src="@/components/yunbu/shan.svg"
            class="image"
            style="width: 380px; height: 300px"
          />
        </div>
        <div class="shijing1" v-show="!sj"></div>
        <div class="shijing2" v-show="!gy"></div>
        <div class="shijing3" v-show="!zy"></div>
  
          <div class="shijing" v-show="!sj">诗经</div>
          <div class="shijing" v-show="!gy">广韵</div>
          <div class="zyyy" v-show="!zy">中原音韵</div>
  
        <div class="rect2"></div>
        <div class="txt">
          <a class="txt1" @click="sj=false, gy=true, zy=true" v-show="sj" href="/yunbu">诗经</a>
          <a class="txt2" @click="gy=false, sj=true, zy=true" v-show="gy" href="/yunbu2">广韵</a>
          <a class="txt3" @click="zy=false, sj=true, gy=true" v-show="zy" href="/yunbu3">中原音韵</a>
        </div>
        <div class="circle12" v-if="sj"></div>
        <div class="circle1" v-else="sj"><div class="circle11"></div></div>
        <div class="circle2" v-if="!gy"><div class="circle21"></div></div>
      <div class="circle22" v-else="!gy"></div>
      <div class="circle3" v-if="!zy"><div class="circle31"></div></div>
      <div class="circle32" v-else="!zy"></div>
  
      <div class="intro2">文字简介:</div>
      <div class="rect3"></div>
      </div>
    </div>

    <div class="right-pane">
      <div class="scrollable-content" ref="scrollable">
        <!-- 右边内容 -->
        <div v-for="(item, index) in yunjiao" :style="getYunbuStyle(index)">
          <div class="yb" @click="goToNewPage(index)">{{ yb[index] }}</div>
          <div
            v-for="(char, Index) in item"
            :key="Index"
            :style="getTextStyle(Index, item, index)"
          >
            <div class="yj">{{ char }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
import cloud from "d3-cloud";

export default {
  data() {
    return {
      imageWidth: 100, // 图片宽度
      imageHeight: 100, // 图片高度
      imageSpacingW: 550, // 图片横向间隔
      imageSpacingH: 200, //图片纵向间隔
      yun: "韵部",
      yb: [],
      yunjiao: [],
      radius: 100,
      gap: 8,
      anglePerCharacter: 8,
      sj: false,
      gy: true,
      zy: true,
    };
  },
  mounted() {
    this.addScrollListener();
    this.scrollToBottom(); // 在页面加载后滚动到底部
  },
  methods: {
    addScrollListener() {
      const scrollableDiv = this.$refs.scrollable;
      scrollableDiv.addEventListener("scroll", this.handleScroll);
    },
    handleScroll(event) {
      // 处理滚动事件
      // 在这里你可以获取滚动位置，并执行需要的操作
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const scrollableDiv = this.$refs.scrollable;
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight; // 将滚动条滚动到底部
      });
    },
    getYunbuStyle(index) {
      const x = index * 300 + 700;
      const y = 200;
      return {
        // positon: "absolute",
        // left: `${x}px`,
        // top: `${y}px`,
        transform: `translate(${x - 400}px, ${y}px)`,
      };
    },

    async getShijing() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shanggu_shijing";
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
            resolve(yunjiao); // 请求成功后resolve数据
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

    getTextStyle(Index, item, index) {
      const squareX = index * 500;
      const squareY = -350;

      //const x = squareX + Math.cos(this.degreesToRadians(Index * 10))* (Index*2 + 120)  + Math.floor(Math.random() * 61) - 500;
      //const y = squareY + Math.sin(this.degreesToRadians(Index * 10))* (Index*2 + 120)  + Math.floor(Math.random() * 61) - 500;
      //const x = squareX + this.generateRandomNumber() + Math.floor(Math.random() * 301) - 100;
      //const y = squareY - Index * 100 + this.generateRandomNumber() + Math.floor(Math.random() * 301) - 200 - 100;
      const x = squareX + this.generateRandomPoint().x;
      const y = squareY + this.generateRandomPoint().y  - Index * 100;

      return {
        transform: `translate(${x}px, ${y}px)`,
      };
    },

    generateRandomNumber() {
      var random = Math.random(); // 生成0到1之间的随机小数

      if (random < 0.5) {
        // 50%的概率落在0-200范围内
        return Math.floor(random * 201) - 200; // 生成0-200的随机整数
      } else {
        // 50%的概率落在200-500范围内
        return Math.floor(100 + random * 301); // 生成200-400的随机整数
      }
    },

    generateRandomPoint() {
  var centerX = 200; // 方块的中心x坐标
  var centerY = 200; // 方块的中心y坐标
  var halfSquareSize = 400; // 方块边长的一半
  var emptySize = 100; // 空白区域的边长

  var x, y;

  // 生成随机点，直到它不在空白区域内
  do {
    x = Math.random() * (2 * halfSquareSize) - halfSquareSize + centerX;
    y = Math.random() * (2 * halfSquareSize) - halfSquareSize + centerY;
  } while (Math.abs(x - centerX) < emptySize / 2 && Math.abs(y - centerY) < emptySize / 2);

  return { x: x, y: y };
},

    // 点击图片时导航到新页面，并传递index作为参数
    goToNewPage(index) {
      this.$router.push(`/yunbu/shijing/${index}`);
    },
  },
  created() {
    this.getShijing();
  },
};
</script>

<style>
.bg {
  display: flex;
  flex-direction: row;
}

.left-pane {
  /* 左边部分样式 */
  width: 60vw;
  height: 100vh;
  display: flex;
  margin-right: 50px;
  margin-left: 0px;
}

.right-pane {
  margin-top: 50px;
  height: 90vh;
  display: flex;
  flex-grow: 1;
  width: 2000px;
  /* background-color: rgb(143, 155, 151); */
  overflow: auto;
}
.test {
  transform: translate(100px, 100px);
}
.scrollable-content {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap; /* Prevent content from wrapping */
}

.yb {
  width: 200px;
  height: 400px;
  margin: 0;
  font-size: 80px;
  background-image: url("@/assets/yunbu/yunbu.svg");
  background-size: contain;
  background-position: center -40px; /* Move the image 40px upward */
  background-repeat: no-repeat;
  color: black;
  position: relative;
  z-index: 999;
}
.yj {
  width: 50px;
  height: 100px;
  font-size: 20px;
  color: black;
  background-image: url("@/assets/yunbu/yunjiao.svg");
  background-size: contain;
  background-position: 8px 0; 
  background-repeat: no-repeat;
}
/* 左边内容 */
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
.intro {
  position: fixed;
  top: 120px;
  left: 50px;
}
.intro1 {
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect1 {
  position: fixed;
  top: 160px;
  left: 50px;
  height: 60px;
  width: 380px;
  background-color: #dedede;
  border-radius: 10px;
}
.pic {
  position: fixed;
  top: 190px;
  left: 50px;
  z-index: 899;
}
.shijing1 {
  position: fixed;
  z-index: 99;
  top: 240px;
  left: 270px;
  background-image: linear-gradient(
    rgba(198, 145, 14, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c6910e;
}
.shijing2 {
  position: fixed;
  z-index: 99;
  top: 240px;
  left: 270px;
  background-image: linear-gradient(
    rgba(224, 157, 10, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e09d0a;
}
.shijing3 {
  position: fixed;
  z-index: 99;
  top: 240px;
  left: 270px;
  background-image: linear-gradient(
    rgba(193, 165, 48, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 130px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #c1a530;
}
.shijing {
  position: fixed;
  z-index: 999;
  top: 280px;
  left: 275px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.zyyy {
  position: fixed;
  z-index: 999;
  top: 250px;
  left: 275px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.rect2 {
  position: fixed;
  top: 470px;
  top: 470px;
  height: 10px;
  width: 340px;
  background-image: linear-gradient(
    to right,
    rgba(198, 145, 14, 1),
    rgba(252, 237, 227, 0.1)
  );
}
.txt {
  position: fixed;
  top: 500px;
  left: 35px;
}
.txt a {
  color: #000;
  font-size: 20px;
}
.txt1 {
  position: fixed;
  left: 35px;
}
.txt2 {
  position: fixed;
  left: 200px;
}
.txt3 {
  position: fixed;
  left: 350px;
}
.circle11 {
  position: fixed;
  z-index: 999;
  top: 462px;
  left: 36.5px;
  width: 22px;
  height: 22px;
  background-color: #c6910e;
  border-radius: 50%;
}
.circle1 {
  position: fixed;
  z-index: 100;
  top: 455px;
  left: 30px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #c6910e;
}
.circle12 {
  position: fixed;
  z-index: 100;
  top: 460px;
  left: 40px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #c6910e;
}
.circle21 {
  position: fixed;
  z-index: 999;
  top: 462px;
  left: 206.5px;
  width: 22px;
  height: 22px;
  background-color: #e09d0a;
  border-radius: 50%;
}
.circle2 {
  position: fixed;
  z-index: 100;
  top: 455px;
  left: 200px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #e09d0a;
}
.circle22 {
  position: fixed;
  z-index: 100;
  top: 460px;
  left: 210px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #e09d0a;
}
.circle31 {
  position: fixed;
  z-index: 999;
  top: 462px;
  left: 366.5px;
  width: 22px;
  height: 22px;
  background-color: #c1a530;
  border-radius: 50%;
}
.circle3 {
  position: fixed;
  z-index: 100;
  top: 455px;
  left: 360px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #c1a530;
}
.circle32 {
  position: fixed;
  z-index: 100;
  top: 460px;
  left: 370px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #c1a530;
}
.intro2 {
  position: fixed;
  top: 560px;
  left: 50px;
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect3 {
  position: fixed;
  top: 600px;
  left: 50px;
  height: 200px;
  width: 380px;
  background-color: #dedede;
  border-radius: 20px;
}
</style>
