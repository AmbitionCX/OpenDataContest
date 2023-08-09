<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar1></navbar1>
    </div>
    <div class="header">语音全览</div>

    <div class="btn1">
      <div class="left1"></div>
      <div class="left2"></div>
    </div>

    <div class="shijing"><a>诗经</a></div>
    <div class="btn2"></div>

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
                  @mouseenter="ShowTooltip(charIndex, $event)"
                  @mouseleave="hideTooltip()"
                >
                  {{ char }}
                </span>
                <span class="tooltip-text" v-if="showTooltip">韵部：{{ item.yunbu }}</span>
                <span
                class="tooltip-text"
                v-if="showTooltip === true"
                :style="{ top: tooltipTop + 'px', left: tooltipLeft + 'px' }">
                韵部：{{ item.yunbu }}
            </span>
              </template>
              <br
            /></span>

            <span v-else
              ><template v-for="(char, charIndex) in item.text"  class="tooltip">
                <span
                  :class="{ 'red-text': char === item.yunjiao }"
                  @mouseenter="ShowTooltip(charIndex, $event)"
                  @mouseleave="hideTooltip()"
                >
                  {{ char }}
                </span>
                <span
                class="tooltip-text"
                v-if="showTooltip === true"
                :style="{ top: tooltipTop + 'px', left: tooltipLeft + 'px' }">
                韵部：{{ item.yunbu }}
            </span>
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
      <div class="txt">词云</div>
    </div>

    <div class="image2">
      <img
        src="@/assets/quanlan/arrow.svg"
        class="image"
        style="width: 400px; height: 40px"
        @click="getWords()"
      />
    </div>

    <div class="image3">
      <img
        src="@/assets/quanlan/bottom.svg"
        class="image"
        style="width: 800px; height: 600px"
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
    this.getWords();
    //this.getContent();
  },
  data() {
    return {
      words: [],
      content: [],
      showTooltip: false,
      showTooltipIndex: -1,
            tooltipTop: 0,
            tooltipLeft: 0,
    };
  },
  components: {
    navbar,
    navbar1,
  },
  methods: {
    ShowTooltip(index, event) {
                this.showTooltip = true;
                this.showTooltipIndex = index;
                this.tooltipTop = event.clientY + 10;
                this.tooltipLeft = event.clientX + 10;
            },
            hideTooltip() {
                this.showTooltipIndex = -1;
            },
    async getWords() {
      return new Promise((resolve, reject) => {
        const url = "http://localhost:5000/get_shijing_cloud";
        axios
          .get(url)
          .then((res) => {
            //console.log(res.data);
            const words = [];
            for (var i = 0; i < res.data.length; i++) {
              words.push({ text: res.data[i], txtwidth: res.data[i].length });
            }
            console.log(words);
            this.words = words;

            const svg = d3
              .select(this.$refs.svg)
              .attr("width", 700)
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
          })
          .catch(function (err) {
            reject(err);
          });
      });
    },

    draw(words) {
      const svg = d3.select(this.$refs.svg);

      svg.selectAll("g").remove();

      const g = svg.append("g").attr("transform", "translate(300,350)");

      g.selectAll("rect")
        .data(words)
        .enter()
        .append("rect")
        .on("click", (event, d) => {
          this.getContent(d.text);
        })
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
.btn1 {
  position: fixed;
  top: 125px;
  left: 60px;
  background-image: linear-gradient(
    to right,
    rgba(232, 129, 73, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 40px;
  width: 50px;
  border: 3px solid #e88149;
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
  position: fixed;
  z-index: 899;
  top: 210px;
  left: 68px;
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.btn2 {
  position: fixed;
  z-index: 99;
  top: 175px;
  left: 60px;
  background-image: linear-gradient(
    rgba(232, 129, 73, 1),
    rgba(252, 237, 227, 0.1)
  );
  height: 140px;
  width: 50px;
  border-radius: 5px;
  border: 3px solid #e88149;
}
.mainBox {
  position: fixed;
  top: 100px;
  display: flex;
  flex-direction: row;
}
.leftBox {
  height: 80vh;
  width: 40vw;
  display: flex;
  /* background-color: rgb(190, 187, 187); */
  margin-right: 50px;
  margin-left: 150px;
}
.content {
  transform: translate(100px, 20px);
  font-size: 20px;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
}
.red-text {
  color: red;
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
  width: 45vw;
  display: flex;
}
.txt {
  position: fixed;
  top: 125px;
  left: 74vw;
  font-size: 30px;
}
.ciyun {
  position: relative;
  top: 100px;
  left: 350px;
}
.image2 {
  position: relative;
  top: 250px;
  left: 630px;
}
.image3 {
  position: relative;
  z-index: -1;
  top: 70px;
  left: 340px;
}
</style>