<template>
  <div class="bg" style="background-color: #f9f5f2">

    <div class="lines">
      <img
        src="@/assets/yunbu/background.svg"
        class="image"
        style="width: 100vw; height: 100vh"
      />
    </div>

    <div class="nav1">
        <navbar2></navbar2>
      </div>
  
      <div class="header">韵部系联</div>

      <div class="btn1"  @click="BackToLastWeb">
      <div class="left1"></div>
      <div class="left2"></div>
    </div>

    <div class="shijing"><a>诗经</a></div>
    <div class="bu"><a>{{ yb[Index] }}部</a></div>
    <div class="intro">统计图表:</div>

    <div class="rect">
      <svg ref="pieChart"></svg>
    </div>

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

    <div class="kuang1">
      <img
        src="@/assets/yunbu/kuang1.svg"
        class="image"
      />
    </div>

    <div class="xinxi-container">
      <div class="xinxi">信息展示</div>
    </div>

    <div class="kuang2">
      <img
        src="@/assets/yunbu/kuang2.svg"
        class="image"
      />
    </div>

    <div class="arrow1">
      <img
        src="@/assets/yunbu/arrow1.svg"
        class="image" @click="decreIndex()"
      />
    </div>

    <div class="arrow2">
      <img
        src="@/assets/yunbu/arrow2.svg"
        class="image" @click="increIndex()"
      />
    </div>

    <div class="rect1">
      <img
        src="@/assets/yunbu/rect.svg"
        class="image"
      />
    </div>

    <div class="rect2">
      <img
        src="@/assets/yunbu/rect.svg"
        class="image"
      />
    </div>

    <div class="rect3">
      <img
        src="@/assets/yunbu/rect.svg"
        class="image"
      />
    </div>

    <div class="txt1"> 章节</div>
    <div class="txt2"> 篇名</div>
    <div class="txt3"> 原文</div>

    <div :style="getChapterStyle(index)" v-for="(item, index) in content.slice(a, b)">
      {{ item.chapter }}
    </div>

    <div :style="getTitleStyle(index)" v-for="(item, index) in content.slice(a, b)">
      {{ item.title }}
    </div>

    <div :style="getTextStyle(index)" v-for="(item, index) in content.slice(a, b)">
      {{ item.text }}
    </div>

    <div class="choose">
      <div class="choose-title"><a>韵脚字</a></div>
      <!-- <el-icon><Filter /></el-icon> -->
      <ul class="choose-content">
        <li v-for="item in yunjiaoChoose" class="hover-item"
        @click="getContent(item)">&nbsp; &nbsp; {{ item.value }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import navbar2 from "@/components/nav/navbar2.vue";
import * as d3 from "d3";
import axios from "axios";

export default {
  data() {
    return {
      Index: this.$route.params.index,
      yun: "韵部",
      yb: [],
      yunjiao: [],
      yunjiaoChoose: [],
      text: [],
      innerRadius: 60, // Radius of the central circle
      gap: 10, // Gap between each circle
      anglePerCharacter: 8, // Adjust the angle per character to control the spiral density
      index: 0,
      content: [{chapter:'', title:'', text:''}],
      contentLenth: 0,
      totalLenth: 377,
      a: 0,
      b: 8,
    };
  },
  components: {
    navbar,
    navbar2,
  },
  computed: {},
  methods: {
    increIndex(){
      // this.index = (Number(this.index) + 1) % this.contentLenth;
      this.a = this.a + 8;
      this.b = this.b + 8;
    },
    decreIndex(){
      // this.index = (Number(this.index) - 1) % this.contentLenth;
      this.a = this.a - 8;
      this.b = this.b - 8;
    },
    async getShijing() {
      return new Promise((resolve, reject) => {
        const path = "/get_shanggu_shijing";
         const url = this.$globalUrl + path;

        axios
          .get(url)
          .then((res) => {
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

            const yjChoose = yunjiao[this.Index];

            for(let i = 0; i < yjChoose.length; i++){
              this.yunjiaoChoose.push({ value: yjChoose[i], label: yjChoose[i] });
            }

            this.yb = yunbu2;
            this.yunjiao = yunjiao;
            this.text = yunjiao[this.Index];

            resolve(yunjiao); // 请求成功后resolve数据
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

    async getContent(item) {
      const searchItem = {
                  yunbu: [this.yb[this.Index]],
                  yunjiaozi: [item.value],
                };
      //console.log('test', searchItem);
      try {
          const response = await axios.post(
          this.$globalUrl + "/shijing_search",
            {
              params: {
                search_item: searchItem,
              },
            }
          );
          console.log("Backend response:", response.data.data);
          //console.log(response.data.data[0].chapter);
          this.content = response.data.data.slice(1);
          this.totalLenth = response.data.data[0].yunbu_length;
          this.contentLenth = response.data.data.length-1;
          this.drawPieChart();
         
        } catch (error) {
          console.error("Error sending clicked word to the backend:", error);
        }
    },

    getChapterStyle(index){
      const padding = 5;
      return {
        position: "absolute",
        left: `${36}vw`, //注意这个left是相对于每个韵脚字而言
        top: `${padding*index + 35}vh`,
      };
    },

    getTitleStyle(index){
      const padding = 5;
      return {
        position: "absolute",
        left: `${50}vw`, //注意这个left是相对于每个韵脚字而言
        top: `${padding*index + 35}vh`,
      };
    },

    getTextStyle(index){
      const padding = 5;
      return {
        position: "absolute",
        left: `${62}vw`, //注意这个left是相对于每个韵脚字而言
        top: `${padding*index + 35}vh`,
      };
    },

    drawPieChart() {
      const data = [
        { label: '该韵脚字原文条数：'+this.contentLenth, value: this.contentLenth },
        { label: '全部原文条数：'+this.totalLenth, value: this.totalLenth-this.contentLenth },
      ];

      const width = 0.22 * window.innerWidth;
      const height = 0.3 * window.innerHeight;
      const radius = Math.min(width, height) / 2.7;

      d3.select(this.$refs.pieChart).selectAll("g").remove();

      const svg = d3.select(this.$refs.pieChart)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(['#F9D4A7', '#c1a530']);

      const pie = d3.pie()
        .value(d => d.value);

      const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      const arcs = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.label));

      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', (d, i) => i === 0 ? '-3em' : '0.35em')
        .attr('dx', '-2em')
        .text(d => `${d.data.label}`);
    },

    // getTextStyle(index) {
    //   const totalCharacters = this.text.length;
    //   const angle = this.degreesToRadians(index * this.anglePerCharacter);
    //   const distanceFromCenter = index / 2 + this.innerRadius;
    //   const x = distanceFromCenter * Math.cos(angle);
    //   const y = distanceFromCenter * Math.sin(angle);
    //   const alpha = 1 - index / totalCharacters; // Calculate the alpha (opacity) value based on the index
    //   return {
    //     // transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
    //     position: "absolute",
    //     left: `${x + 420}px`,
    //     top: `${y + 420}px`,
    //     color: `rgba(193, 165, 48, 1)`,
    //     //color: `rgba(200, 150, 0, ${alpha})`, 
    //   };
    // },
    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    },
    BackToLastWeb(){
      window.location.href = `/yunbu`; 
    },
  },
  created() {
    this.getShijing();
  },
  mounted() {
    this.drawPieChart();
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
  .yunbu {
    position: fixed;
  bottom: 10vh;
  left: 30vw;
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
  height: 30vh;
  width: 22vw;
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
.kuang1 {
  position: absolute;
  top: 15vh;
  left: 26.5vw;
  width: 20vw;
  height: 12vh;
  /* z-index: 999; */
}
.xinxi-container {
  position: absolute;
  top: 15vh;
  left: 26.5vw;
  width: 20vw;
  height: 12vh;
  /* background-color: aquamarine; */
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: left; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding-left: 3vw;
}
.xinxi {
  color: #000;
  font-size: 20px;
}
.kuang2 {
  position: absolute;
  top: 25vh;
  left: 29vw;
  width: 50vw;
  /* height: 40vh; */
}
.choose {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 15vh;
  right: 5vw;
}
.choose-title {
  width: 180px;
  height: 45px;
  background-image: linear-gradient(
    to left,
    rgba(252, 237, 227, 1),
    rgba(193, 165, 48, 1)
  );
  border-radius: 5px;
      display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: left; /* 水平居中文本 */
  padding-left: 20px;
}
.choose-title a {
  color: #000;
  font-size: 25px;
}
.choose-content {
  border: 2px solid #c1a530;
  background-color: #f9f5f2;
  width: inherit;
  height: 530px;
  overflow: auto;
  text-align: left;
}
.hover-item {
  cursor: pointer; /* 将鼠标指针设置为手指形状 */
}
.hover-item:hover {
  background-color: rgba(193, 165, 48, 0.3); /* 设置悬浮时的背景颜色 */
}
.arrow1 {
  position: absolute;
  top: 45vh;
  left: 30vw;
  width: 2vw;
  cursor: pointer;
}
.arrow2 {
  position: absolute;
  top: 45vh;
  left: 75vw;
  width: 2vw;
  cursor: pointer;
}
.rect1 {
  position: absolute;
  top: 30vh;
  left: 34vw;
  width: 1.5vw;
}
.rect2 {
  position: absolute;
  top: 30vh;
  left: 48vw;
  width: 1.5vw;
}
.rect3 {
  position: absolute;
  top: 30vh;
  left: 60vw;
  width: 1.5vw;
}
.txt1 {
  position: absolute;
  top: 29.5vh;
  left: 36vw;
  font-size: 1.3rem;
}
.txt2 {
  position: absolute;
  top: 29.5vh;
  left: 50vw;
  font-size: 1.3rem;
}
.txt3 {
  position: absolute;
  top: 29.5vh;
  left: 62vw;
  font-size: 1.3rem;
}
.txt11 {
  position: absolute;
  top: 35.5vh;
  left: 48vw;
  font-size: 1.3rem;
}
.txt21 {
  position: absolute;
  top: 50.5vh;
  left: 48vw;
  font-size: 1.3rem;
}
.txt31 {
  position: absolute;
  top: 65.5vh;
  left: 48vw;
  font-size: 1.3rem;
}
</style>