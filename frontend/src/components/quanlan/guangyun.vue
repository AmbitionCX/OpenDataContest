<template>
  <div class="bg" style="background-color: #f9f5f2">
    <div class="nav1">
      <navbar1></navbar1>
    </div>
    <div class="header">语音全览</div>

    <div class="shijing-quanlan"><a>广韵</a></div>

  <div>
    <a href="/quanlan/shijing"><div class="cir1"></div></a>
    <div class="line1"></div>
    <div class="cir11"></div>
    <div class="cir12"></div>
    <div class="line2"></div>
    <div class="line3"></div>
    <a href="/quanlan/zhongyuan"><div class="cir3"></div></a>
  </div>

    <div class="mainBox">
      <div class="leftBox">
        <div class="image-container">
        <img :src="picUrl" />
      </div>
      <div class="tu-txt">词云链图</div>
      </div>

      <div class="rightBox">
        <svg ref="svg"></svg>
      </div>
    </div>

    <div class="ciyun">
      <img src="@/assets/quanlan/title.svg" class="image" 
      style="width: 300px; height: 150px; transform: translate(20px, -25px)" />
      <el-input class="txt2" v-model="input" placeholder="请输入汉字" 
      style="width: 170px; background-color:transparent;" @keyup.enter="updateInput" />
      <Search class="search" style="width: 30px; height: 30px; margin-right: 8px; 
      color: #fffdfd; cursor: pointer;" @click="wordClicked(input)"/>
    </div>

    <div class="image2">
      <img src="@/assets/quanlan/arrow.svg" class="image" 
      style="width: 40px; height: 40px; cursor: pointer;" @click="incrementNum()"/>
    </div>

    <div class="image4">
      <img src="@/assets/quanlan/arrow2.svg" class="image" 
      style="width: 40px; height: 40px; cursor: pointer;" @click="decrementNum()"/>
    </div>

    <div class="image3">
      <img
        src="@/assets/quanlan/bottom1.svg"
        class="image"
        style="width: 100vw; height: 100vh"
      />
    </div>

    <div class="link">
      <a @click="goToNewPage(yunbu_props)">了解详情</a>
    </div>

    <div class="choose">
      <div class="choose-title"><a>筛选</a></div>
      <ul class="choose-content">
        <li v-for="item in yunbu" class="hover-item"
        @click="getWords(item)">{{ item }}</li>
      </ul>
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
    this.getYunbu();
  },
  data() {
    return {
      words: [],
      picUrl: "",
      yunbu: [],
      yunjiao: [],
      num: 1,
      ciyun: true,
      input: '',
      yunbu_props: '',
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
        this.wordClicked(this.input);
      },
    incrementNum(){
      this.num = this.num+1;
      this.drawPre(this.words);
    },
    decrementNum(){
      this.num = this.num-1;
      this.drawPre(this.words);
    },
    async getYunbu() {
        return new Promise((resolve, reject) => {
          const url = "http://localhost:5000/get_zhonggu_guangyun";
          axios
            .get(url)
            .then((res) => {
              const yunbu = [];
              const yunjiao = [];
              //console.log(res.data[1])
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
                  yunjiao[yunbu2.indexOf(res.data[i][2])].push(res.data[i][0]);
                }
              }
  
              this.yunbu = yunbu2;
              this.yunjiao = yunjiao;
              resolve(yunjiao); // 请求成功后resolve数据
            })
            .catch(function (err) {
              reject(err); // 请求失败后reject错误
            });
        });
      },

      getWords(yunbu){
        const yunjiao = this.yunjiao[this.yunbu.indexOf(yunbu)]
        this.yunbu_props = yunbu;

        const Words = [];
            for (var i = 0; i < yunjiao.length; i++) {
              Words.push({ text: yunjiao[i], txtwidth: 1 });
            }
            console.log(Words);
            this.words = Words;
            this.drawPre(Words);
      },

      drawPre(Words){
        const words = this.getElements(Words, this.num);

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
              .fontSize(25)
              .on("end", this.draw);

            layout.start();
      },

    draw(words) {
      const svg = d3.select(this.$refs.svg);

      svg.selectAll("g").remove();

      const g = svg.append("g").attr("transform", "translate(60,0)");

      const rectList = this.getPosition();
        // const rectWidth = 100; const rectHeight = 40; const rectPadding = 5;
        const rectWidth = 100; 
        const rectHeight = 40; const rectPadding = 5;

        g.selectAll("rect")
          .data(rectList)
          .enter()
          .append("rect")
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .attr("width", rectWidth)
          .attr("height", rectHeight)
          .style("fill", "#e88149")
          .attr("rx", 8)
          .attr("ry", 8)
          .style("opacity", 0.5);

      g.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .attr("cursor", "pointer")
        .on("click", (event, d) => this.wordClicked(d.text))
        .attr("x", (d,i) => rectList[i].x + rectWidth/2)
          .attr("y", (d,i) => rectList[i].y + rectHeight/2)
        .style("font-size", (d) => 30 + "px")
        .style("font-family", "Impact")
        .style("fill", "white")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d) => d.text);
    },

    getPosition(){
        // const rectWidth = 100; const rectHeight = 40; const rectPadding = 5;
        const rectWidth = 100; 
        const rectHeight = 40; const rectPadding = 5;

        return [
          {x: rectWidth*2+rectPadding*2, y: 0},
          {x: rectWidth*1.5+rectPadding, y: rectHeight+rectPadding},
          {x: rectWidth*2.5+rectPadding*2, y: rectHeight+rectPadding},
          {x: rectWidth*0.5+rectPadding*0, y: rectHeight*2+rectPadding*2},
          {x: rectWidth*1.5+rectPadding*1, y: rectHeight*2+rectPadding*2},
          {x: rectWidth*2.5+rectPadding*2, y: rectHeight*2+rectPadding*2},
          {x: rectWidth*3.5+rectPadding*3, y: rectHeight*2+rectPadding*2},
          {x: rectWidth*0+rectPadding*0, y: rectHeight*3+rectPadding*3},
          {x: rectWidth*1+rectPadding*1, y: rectHeight*3+rectPadding*3},
          {x: rectWidth*2+rectPadding*2, y: rectHeight*3+rectPadding*3},
          {x: rectWidth*3+rectPadding*3, y: rectHeight*3+rectPadding*3},
          {x: rectWidth*4+rectPadding*4, y: rectHeight*3+rectPadding*3},
          {x: rectWidth*0.5+rectPadding*0, y: rectHeight*4+rectPadding*4},
          {x: rectWidth*1.5+rectPadding*1, y: rectHeight*4+rectPadding*4},
          {x: rectWidth*2.5+rectPadding*2, y: rectHeight*4+rectPadding*4},
          {x: rectWidth*3.5+rectPadding*3, y: rectHeight*4+rectPadding*4},
          {x: rectWidth*1.5+rectPadding, y: rectHeight*5+rectPadding*5},
          {x: rectWidth*2.5+rectPadding*2, y: rectHeight*5+rectPadding*5},
          {x: rectWidth*2+rectPadding*2, y: rectHeight*6+rectPadding*6},
        ]
      },

    async wordClicked(word) {
    // Send the clicked word to the backend using an API call
    try {
      console.log(word);
      const response = await axios.post(
        "http://localhost:5000/get_guangyun_url",
        { params: {
          Word: word
        } }
      );
      console.log("Word clicked:", word); 
      console.log("Backend response:", response.data);
      this.picUrl = response.data['data'];
    } catch (error) {
      console.error("Error sending clicked word to the backend:", error);
    }
  },

  getElements(arr, num) {
    const chunkSize = 19;
  const startIndex = (num - 1) * chunkSize;
  const endIndex = startIndex + chunkSize;
  
  const wrappedStartIndex = startIndex % arr.length;
  const wrappedEndIndex = endIndex % arr.length;
  
  if (wrappedEndIndex > wrappedStartIndex) {
    return arr.slice(wrappedStartIndex, wrappedEndIndex);
  } else {
    return arr.slice(wrappedStartIndex).concat(arr.slice(0, wrappedEndIndex));
  }
},

goToNewPage(yunbu_props) {
      const index = this.yunbu.indexOf(yunbu_props)
      this.$router.push(`/yunbu2/${index}`);
    },

  },
};
</script>
        
    <style scoped>
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
  z-index: 999;
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
.cir1 {
  position: fixed;
  z-index: 100;
  top: 125px;
  left: 63px;
  width: 30px;
  height: 30px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 5px solid #e88149;
}
.cir11 {
  position: fixed;
  top: 330px;
  left: 55px;
  width: 45px;
  height: 45px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 6px solid #e88149;
}
.cir12 {
  position: fixed;
  top: 342px;
  left: 68px;
  width: 20px;
  height: 20px;
  background-color: #e88149;
  border-radius: 50%;
}
.line1 {
  position: fixed;
  top: 155px;
  left: 75px;
  height: 180px;
width: 5px;
background-color: #e88149;
}
.line2 {
  position: fixed;
  top: 373px;
  left: 75px;
  height: 25px;
width: 5px;
background-color: #e88149;
}
.cir2 {
  position: fixed;
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
  z-index: 1;
  top: 530px;
  left: 75px;
  height: 25px;
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
.shijing-quanlan {
position: fixed;
z-index: 9999;
top: 390px;
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
.shijing-quanlan a {
writing-mode: vertical-lr;
letter-spacing: 0.3em;
font-size: 23px;
color: black;
}
.mainBox {
}
.leftBox {
  position: absolute;
  top: 100px;
  left: 0;
  height: 83vh;
  width: 35vw;
  display: flex;
  background-color: rgb(212, 212, 212);
  margin-right: 15vw;
  margin-left: 130px;
  border-radius: 5%;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding-bottom: 10px;
}
.image-container {
  height: 70vh;
  width: 30vw;
  border-radius: 4%;
}
.tu-txt {
  position: absolute;
  bottom: 10px;
  text-align: center;
  font-size: 25px;
}
.rightBox {
  position: absolute;
  top: 30vh;
  left: 57vw;
  height: 50vh;
  width: 43vw;
  /* background-color: aqua; */
}
.choose {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 133px;
  left: 48vw;
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
  color:#000;
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
.txt {
  position: fixed;
  top: 125px;
  left: 76vw;
  font-size: 30px;
}
.txt2 {
  position: fixed;
  top: 133px;
  left: calc(63vw + 100px);
  font-size: 20px;
  color: #838080;
}
.search {
  position: fixed;
  top: 133px;
  left: calc(63vw + 300px);
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
.ciyun {
  position: fixed;
  top: 100px;
  left: 63vw;
  width: 400px;
}
.image2 {
  position: fixed;
  z-index: 99;
  top: 350px;
  right: 20px;
  width: 50px;
}
.image3 {
  position: fixed;
  z-index: -1;
  bottom: 0;
  left: 0;
}
.image4 {
  position: fixed;
  z-index: 90;
  width: 50px;
  left: 63vw;
  top: 350px;
}
.link {
  position: fixed;
  bottom: 10vh;
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
  cursor: pointer;
}
</style>