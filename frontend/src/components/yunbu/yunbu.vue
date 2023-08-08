<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="left-pane">
      <!-- 左边内容 -->
      <div class="nav1">
        <navbar2></navbar2>
      </div>
      <div class="header">韵部系联</div>
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
        <div v-for="(item, index) in yb" :style="getYunbuStyle(index)">
          <div class="yb">{{ item }}</div>
          <!-- <span class="yb" @click="goToNewPage(index)">{{ yb[index] }}</span> -->
        </div>

        <!-- <svg ref="svg" v-html="drawWordCloud(Object.values(this.yunjiao[0]))" class="wordcloud-icon"></svg> -->
        <svg
          ref="svg"
          v-html="drawWordCloud(yunjiao[1])"
          style="transform: translate(-120px, -3300px)"
          class="yj"
        ></svg>

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
      const x = index * (500) + 700;
      const y = 200;
      return {
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

    drawWordCloud(words) {
      console.log(words);
      console.log(words ? Object.values(words) : []);
      words = words ? Object.values(words) : [];

      const svg = d3
        .select(this.$refs.svg)
        .attr("width", 1200)
        .attr("height", 1200);

      const layout = cloud()
        .size([1100, 1100])
        .words(words.map((word) => ({ text: word, size: 20 }))) // Ignore txtwidth, set size to a constant value
        .padding(5)
        .rotate(() => 0) // 设置旋转角度为0，即不旋转
        .font("Impact")
        .fontSize(30) // Use the size property for font size
        .on("end", (words) => this.draw(svg, words)); // Pass the SVG and words to the draw function

      layout.start();
    },

    draw(svg, words) {
      svg.selectAll("g").remove();

      // Define the position and size of the black square
      const squareX = 550; // Center X position
      const squareY = 550; // Center Y position
      const squareSize = 100;

      // Create a group and translate it to the center of the SVG
      const g = svg
        .append("g");

      //const g = svg.append("g").attr("transform", "translate(250,250)");


      // Calculate the radius of the circular arrangement
      const radius = squareSize / 2 + 10;

      g.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        //最后一个括号里，前面是每一圈间距，后面是圆圈内径
        .attr("x", (d, i) => squareX + Math.cos(this.degreesToRadians(i * 10))* (i*2 + 120)  + Math.floor(Math.random() * 61) - 30)
        .attr("y", (d, i) => squareY + Math.sin(this.degreesToRadians(i * 10)) * (i*2 + 180) + Math.floor(Math.random() * 61) - 30)
        //添加背景图片start
    //     .append("xhtml:div")
    // .style("width", "100%")
    // .style("height", "100%")
    // .style("background-image", `url(./assets/yunbu/yunjiao.svg)`) // Replace with your background image URL
    // .style("background-size", "cover")
    // .style("display", "flex")
    // .style("align-items", "center")
    // .style("justify-content", "center")
    // .append("xhtml:div")
        //添加背景图片end
        .style("font-size", (d) => d.size + "px") // Use the size property for font size
        .style("font-family", "Impact")
        .style("fill", "black")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d) => d.text); // Display the text property of each word
    },

    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
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
  background-color: rgb(143, 155, 151);
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
}
.yj {

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
