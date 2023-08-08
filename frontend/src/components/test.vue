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
          <a
            class="txt1"
            @click="(sj = false), (gy = true), (zy = true)"
            v-show="sj"
            href="/yunbu"
            >诗经</a
          >
          <a
            class="txt2"
            @click="(gy = false), (sj = true), (zy = true)"
            v-show="gy"
            href="/yunbu2"
            >广韵</a
          >
          <a
            class="txt3"
            @click="(zy = false), (sj = true), (gy = true)"
            v-show="zy"
            href="/yunbu3"
            >中原音韵</a
          >
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
        <!-- <div v-for="(item, index) in yunjiao" :style="getImageStyle(index)">
          <span class="yb" @click="goToNewPage(index)">{{ yb[index] }}</span>
          <div
            v-for="(char, Index) in item"
            :key="Index"
            :style="getTextStyle(Index, item, index)"
          >
            <span class="yj">{{ char }}</span>
          </div>
        </div> -->
        <!-- <div v-for="num in 60" :key="num" :style="getNumberStyle(num)">
          {{ num }}
        </div> -->
        <div v-for="(item, Index) in yb" :style="getImageStyle(Index)">
          <div class="yb" @click="goToNewPage(Index)"> {{ item }} </div>
          <!-- <div class="yj"> {{ this.drawWordCloud(yunjiao[0]) }} </div> -->
          <svg ref="svg" v-html="drawWordCloud(yunjiao[Index])" class="wordcloud-icon"></svg>
          <!-- <div
            v-for="(char, index) in yunjiao[Index]"
            :style="getTextStyle(Index, yunjiao[Index])">
            <span class="yj">{{ char }}</span>
          </div> -->
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
      cloudWidth: 200, // Adjust the width of the word cloud
      cloudHeight: 200, // Adjust the height of the word cloud
      whitespaceSize: 200, // Size of the blank area in the middle
    };
  },
  computed: {
    images() {
      const totalImages = 29;
      const images = [];
      for (let i = 0; i < totalImages; i++) {
        const row = i % 2;
        const col = Math.round(i / 2);
        const x =
          col * (this.imageWidth + this.imageSpacingW - 200) - row * 200 + 600;
        const y = row * (this.imageHeight + this.imageSpacingH) + 300;
        images.push({ x, y });
      }
      return images;
    },
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
    getImageStyle(index) {
      const image = this.images[index];
      return {
        transform: `translate(${image.x - 400}px, ${image.y - 100}px)`,
        //position: "absolute",
        // left: `${image.x}px`,
        // top: `${image.y}px`,
      };
    },

    async getShijing() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shanggu_shijing";
        axios
          .get(url)
          .then((res) => {
            const yunbu = [];
            const yunjiao = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i][2] != "" && res.data[i][2] != 0) {
                yunbu.push(res.data[i][2]);
              }
            }
            const yunbu2 = Array.from(new Set(yunbu));

            for (let i = 0; i < yunbu2.length; i++) {
              yunjiao[i] = [];
            }

            for (let i = 0; i < res.data.length; i++) {
              if (yunbu2.indexOf(res.data[i][2]) != -1) {
                yunjiao[yunbu2.indexOf(res.data[i][2])].push(res.data[i][1]);
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

    getTextStyle(Index, words) {
      const left = this.getRandomPosition();
      const top = this.getRandomPosition();
      const row = Index % 2;
      const col = Math.round(Index / 2);
      const rx =
          col * (this.imageWidth + this.imageSpacingW - 200) - row * 200 + 600;
      const ry = row * (this.imageHeight + this.imageSpacingH) + 300;

      return {
        transform: `translate(${left+rx}px, ${top+ry}px)`,
      };
    },

    getRandomPosition() {
      //const range = this.cloudWidth - this.whitespaceSize;
      //return Math.floor(Math.random() * (range + 1)) - range / 2;
      return Math.random() * 400 - 200;
    },

    drawWordCloud(words) {
      //console.log(words)
  const svg = d3.select(this.$refs.svg)
    .attr("width", 500)
    .attr("height", 500);

  const layout = cloud()
    .size([500, 500])
    .words(words.map(word => ({ text: word, size: 20 }))) // Ignore txtwidth, set size to a constant value
    .padding(5)
    .rotate(() => 0) // 设置旋转角度为0，即不旋转
    .font("Impact")
    .fontSize(d => d.size) // Use the size property for font size
    .on("end", words => this.draw(svg, words)); // Pass the SVG and words to the draw function

    console.log(layout);

  layout.start();
},

draw(svg, words) {
  svg.selectAll("g").remove();

  const g = svg.append("g")
    .attr("transform", "translate(250,250)");

  g.selectAll("text")
    .data(words)
    .enter()
    .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .style("font-size", d => d.size + "px") // Use the size property for font size
      .style("font-family", "Impact")
      .style("fill", "black")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text(d => d.text); // Display the text property of each word
},

    // 点击图片时导航到新页面，并传递index作为参数
    goToNewPage(index) {
      this.$router.push(`/yunbu/shijing/${index}`);
    },
  },
  created() {
    this.getShijing();
    // this.drawWordCloud(this.yunjiao[0]);
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
  /* background-color: aquamarine; */
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
  background-image: url('@/assets/yunbu/yunbu.svg');
  background-size: contain;
  background-position: center -40px; /* Move the image 40px upward */
  background-repeat: no-repeat;
  color: black;
}
.yj {
  width: 200px;
  height: 400px;
  margin: 0;
  font-size: 40px;
  background-image: url('@/assets/yunbu/yunjiao.svg');
  background-size: contain;
  background-repeat: no-repeat;
  color: black;
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
