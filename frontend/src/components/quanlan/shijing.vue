<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar1></navbar1>
    </div>
    <div class="header">语音全览</div>

    <div class="shijing"><a>诗经</a></div>
    <div>
    <div class="cir11"></div>
    <div class="cir12"></div>
    <div class="line1"></div>
    <div class="line2"></div>
    <a href="/quanlan/guangyun"><div class="cir2"></div></a>
    <div class="line3"></div>
    <a href="/quanlan/zhongyuan"><div class="cir3"></div></a>
  </div>

    <div class="mainBox">
      <div class="leftBox">
        <ul class="content">
          <span v-for="(item, index) in content"  class="tooltip">
            <span v-if="item.text === ''" style="color: transparent;">none<br /></span>
            <span
            v-else-if="
                item.text.endsWith('。') ||
                item.text.endsWith('！') ||
                item.text.endsWith('？') ||
                item.text.endsWith('：')
              "
            >
              <template v-for="(char, charIndex) in item.text">
                <span
                  :class="{ 'red-text': char === item.yunjiao }"
                  @mouseenter="showTooltip = true"
                  @mouseleave="showTooltip = false"
                >
                  {{ char }}
                </span>
                <span class="tooltip-text" v-if="showTooltip">韵部：{{ item.yunbu }}</span>
              </template>
              <br
            /></span>

            <span v-else
              ><template v-for="(char, charIndex) in item.text"  class="tooltip">
                <span
                  :class="{ 'red-text': char === item.yunjiao }"
                  @mouseenter="showTooltip = true"
                  @mouseleave="showTooltip = false"
                >
                  {{ char }}
                </span>
                <span class="tooltip-text" v-if="showTooltip">韵部：{{ item.yunbu }}</span>
              </template></span
            >
          </span>
        </ul>
      </div>

      <div class="rightBox">
        <svg ref="svg"></svg>
      </div>
    </div>

    <div class="ciyun">
      <img
        src="@/assets/quanlan/title.svg"
        class="image"
        style="width: 300px; height: 150px; transform: translate(20px, -25px)"
      />
      <div class="txt" v-if="ciyun">词云</div>
      <el-input class="txt2" v-else v-model="input" placeholder="请输入标题" 
      style="width: 170px; background-color:transparent;" @keyup.enter="updateInput" />
    <Search class="search" style="width: 30px; height: 30px; margin-right: 8px; 
      color: #fffdfd;" @click="ciyun=false"/>
    </div>  

    <!-- <div class="image2">
      <img
        src="@/assets/quanlan/arrow.svg"
        class="image"
        style="width: 400px; height: 40px"
        @click="getWords()"
      />
    </div> -->
    <div class="choose">
      <div class="choose-title"><a>词云筛选</a></div>
      <!-- <el-icon><Filter /></el-icon> -->
      <ul class="choose-content">
        <li v-for="item in chapter" class="hover-item"
        @click="getTitle(item.value)">{{ item.value }}</li>
      </ul>
    </div>

    <div class="link">
      <a href="/yunbu">了解详情</a>
    </div>

    <div class="image3">
      <img
        src="@/assets/quanlan/bottom1.svg"
        class="image"
        style="width: 100vw; height: 100vh"
      />
    </div>
  </div>
</template>
        
    <script>
import navbar from "@/components/navbar.vue";
import navbar1 from "@/components/nav/navbar1.vue";
import * as d3 from "d3";
import axios from "axios";
import cloud from "d3-cloud";

export default {
  mounted() {
    this.getChapter();
    this.selectedOption = "国风·周南";
    this.getTitle("国风·周南");
    this.getContent('關雎');
    //this.getContent();
  },
  data() {
    return {
      words: [],
      content: [],
      showTooltip: false,
      ciyun: true,
      chapter: [],
      input: '',
      selectedOption: null,
    };
  },
  components: {
    navbar,
    navbar1,
  },
  methods: {
    updateInput() {
        // 在回车键按下事件处理程序中更新input数据属性
        // 这会将输入框中的值赋给input
        this.input = event.target.value;
        console.log(this.input);
        this.getContent(this.input);
      },

    //获取所有章节名称，做成下拉菜单
    async getChapter() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shijing_chapter";
        axios
          .get(url)
          .then((res) => {
            console.log('chapter: ',res.data);
            for(let i = 0; i < res.data.length; i++){
              this.chapter.push({ value: res.data[i], label: res.data[i] });
            }
            console.log(this.chapter);
          })
        })
    },

    handleOptionChange() {
      // 调用您的函数，并将选中的选项作为参数传递
      if (this.selectedOption) {
        //console.log(this.selectedOption);
        this.getTitle(this.selectedOption);
      }
    },

    async getTitle(chapter) {
        try {
          const response = await axios.post(
            "http://localhost:5000/shijing_word_cloud",
            {
              params: {
                chapter: chapter,
              },
            }
          );
          //console.log("Backend response:", response.data);
          const words = [];
              for (var i = 0; i < response.data.length; i++) {
                words.push({ text: response.data[i], txtwidth: response.data[i].length });
              }
          //console.log(words);
          this.words = words;

          const svg = d3
                .select(this.$refs.svg)
                .attr("width", 800)
                .attr("height", 800);
  
              const layout = cloud()
                .size([500, 300])
                .words(words)
                .padding(5)
                .rotate(() => 0) // 设置旋转角度为0，即不旋转
                .font("Impact")
                .fontSize(30) //词云间距
                .on("end", this.draw);
  
              layout.start();
        } catch (error) {
          console.error("Error sending clicked word to the backend:", error);
        }
      },

      draw(words) {
        const svg = d3.select(this.$refs.svg);
  
        svg.selectAll("g").remove();
  
        const g = svg.append("g").attr("transform", "translate(430,300)");
  
        g.selectAll("rect")
          .data(words)
          .enter()
          .append("rect")
          .on("click", (event, d) => {
            this.getContent(d.text);
          })
          .attr("cursor", "pointer")
          .attr("x", (d) => d.x - d.txtwidth * 15 - 10)
          .attr("y", (d) => d.y - 20)
          .attr("width", (d) => d.txtwidth * 30 + 20)
          .attr("height", (d) => 40)
          .style("fill", "red")
          .attr("rx", 8)
          .attr("ry", 8)
          .style("opacity", 0.3);
  
        g.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .on("click", (event, d) => {
            this.getContent(d.text);
          })
          .attr("cursor", "pointer")
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .style("font-size", (d) => 30 + "px")
          .style("font-family", "Impact")
          .style("fill", "white")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .text((d) => d.text);
      },

      async getContent(title) {
        try {
          const response = await axios.post(
            "http://localhost:5000/shijing_full_text",
            {
              params: {
                title: title,
              },
            }
          );
          console.log("Backend response:", response.data.data);
          this.content = response.data.data;
          this.content.unshift(
            {text: this.selectedOption, yunjiao: '', yunbu: ''},
            {text: '', yunjiao: '', yunbu: ''},
            {text: title, yunjiao: '', yunbu: ''},
            {text: '', yunjiao: '', yunbu: ''},
            {text: '', yunjiao: '', yunbu: ''}
          )
        } catch (error) {
          console.error("Error sending clicked word to the backend:", error);
        }
      },

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
  top: 5px;
  left: 47vw;
  font-size: 30px;
  color: #f6f5f5;
  text-align: center;
}
.cir11 {
  position: fixed;
  top: 125px;
  left: 55px;
  width: 45px;
  height: 45px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 6px solid #e88149;
}
.cir12 {
  position: fixed;
  z-index: 999;
  top: 137px;
  left: 68px;
  width: 20px;
  height: 20px;
  background-color: #e88149;
  border-radius: 50%;
}
.line1 {
  position: fixed;
  top: 165px;
  left: 75px;
  height: 25px;
width: 5px;
background-color: #e88149;
}
.line2 {
  position: fixed;
  top: 330px;
  left: 75px;
  height: 25px;
width: 5px;
background-color: #e88149;
}
.cir2 {
  position: fixed;
  z-index: 100;
  top: 353px;
  left: 63px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}
.line3 {
  position: fixed;
  top: 380px;
  left: 75px;
  height: 170px;
width: 5px;
background-color: #e88149;
}
.cir3 {
  position: fixed;
  z-index: 100;
  top: 550px;
  left: 63px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}
.shijing {
position: fixed;
z-index: 99;
top: 190px;
left: 51px;
background-image: linear-gradient(
  rgba(232, 129, 73, 1),
  rgba(252, 237, 227, 0.1)
);
height: 140px;
width: 50px;
border-radius: 5px;
border: 3px solid #e88149;
display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
align-items: center; /* 垂直居中文本 */
justify-content: center; /* 水平居中文本 */
}
.shijing a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.mainBox {
  position: fixed;
  top: 100px;
  display: flex;
  flex-direction: row;
}
.leftBox {
  height: 70vh;
  width: 30vw;
  display: flex;
  background-color: rgb(223, 224, 224);
  border-radius: 5%;
  margin-right: 50px;
  margin-left: 150px;
  margin-top: 4vh;
  overflow: auto;
  opacity: 0.75;
}
.content {
  transform: translate(0, 20px);
  font-size: 20px;
  /* margin-top: 50px; */
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
}
.red-text {
  color: white;
  background-color: #BC3E17;
  display: inline;
  cursor: pointer;
}
.tooltip {
  position: relative;
  display: inline;
}
.tooltip-text {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px;
  border-radius: 5px;
  display: none;
}
.tooltip:hover .tooltip-text {
  display: block;
}
.same-line {
  display: inline-block;
  margin-right: 10px; /* Adjust spacing as needed */
}

.rightBox {
  height: 600px;
  width: 50vw;
  display: flex;
  margin-left: 50px;
}
.choose {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 133px;
  left: 45vw;
}
.choose-title {
  width: 180px;
  height: 45px;
  background-image: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  border-radius: 5px;
      display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}
.choose-title a {
  color: #000;
  font-size: 25px;
}
.choose-content {
  border: 3px solid rgba(232, 129, 73, 0.5);
  background-color: #f9f5f2;
  width: inherit;
  height: 530px;
  overflow: auto;
}
.choose-content::-webkit-scrollbar-thumb {
  background-color: red; /* 设置滚动条滑块颜色 */
}
.hover-item {
  cursor: pointer; /* 将鼠标指针设置为手指形状 */
}
.hover-item:hover {
  background-color: rgba(232, 129, 73, 0.3); /* 设置悬浮时的背景颜色 */
}
.el-input__wrapper {
  background-color: transparent;
    --el-input-border-color: transparent;
    --el-input-focus-border: transparent;
    --el-input-focus-border-color: transparent;
    --el-input-hover-border-color: transparent;
    --el-input-clear-hover-color: transparent;
    --el-input-hover-border: transparent;
}
.el-select {
  --el-select-border-color-hover: transparent;
  --el-select-input-focus-border-color: transparent;
  width: 220px;
}
.el-input__inner {
  font-size: 20px;
}
.el-input {
  --el-input-placeholder-color: rgb(94, 90, 90);
}
:root {
  /* --el-fill-color-light: linear-gradient(to right, red, white); */
  --el-fill-color-light: rgba(252, 237, 227, 0.8);
  --el-bg-color-overlay: linear-gradient(rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 1));
}
.el-select-dropdown__item.selected {
  color: #000;
}
.txt {
  position: fixed;
  top: 125px;
  left: 76vw;
  font-size: 30px;
}
.txt2 {
  position: fixed;
  top: 133px;
  left: 70vw;
  font-size: 20px;
  color: #838080;
}
.search {
  position: fixed;
  top: 133px;
  left: 85vw;
}
.ciyun {
  position: fixed;
  top: 100px;
  left: 63vw;
  width: 400px;
}
.image2 {
  position: relative;
  top: 400px;
  left: 630px;
}
.image3 {
  position: fixed;
  z-index: -1;
  bottom: 0;
  left: 0;
}
.link {
  position: fixed;
  top: 600px;
  left: 73vw;
  width: 180px;
  height: 40px;
  background-image: linear-gradient(to left, rgba(232, 129, 73, 1),
      rgba(252, 237, 227, 0.1));
  border-radius: 5px;
  border: 3px solid #e88149;
      display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
}
.link a {
  color: #000;
  font-size: 20px;
}
</style>