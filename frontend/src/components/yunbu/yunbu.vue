<template>
  <div class="bg" style="background-color: #f9f5f2">

    <div class="yunbuBG">
        <img
          src="@/assets/yunbu/yunbuBG.svg"
          class="image" style="width: 100vw; height: 100vh"
        />
      </div>

    <div class="nav1">
      <navbar></navbar>
    </div>
    <div class="header">韵部系联</div>

    <div class="intro">
      <div class="intro1">文字简介:</div>
      <div class="rect1-yunbu">
        <p>《诗经》的韵部代表上古的韵部系统，通过系联《诗经》的韵脚字，宋代以来的学者不断归纳、更新上古韵部系统，现代学者王力先生总结为上古29部，是为集大成者。</p>
      </div>
      <div class="pic">
        <img
          src="@/components/yunbu/shan.svg"
          class="image"
        />
      </div>

      <div class="shijing"><a>诗经</a></div>

      <div class="rect2-yunbu"></div>
      <div class="txt">
          <a class="txt2" href="/yunbu2/14">广韵</a>
          <a class="txt3" href="/yunbu3/14">中原音韵</a>
        </div>
      <div class="circle12" @click="ToLinkSJ"></div>
    <div class="circle22" @click="ToLinkGY"></div>

    <div class="circle1"><div class="circle11"></div></div>
    <div class="circle22" @click="ToLinkGY"></div>
    <div class="circle32" @click="ToLinkZY"></div>

    <div class="cir2-arrow-yunbu">
    <img v-if="showImage" src="@/assets/yunbu/arrow5.svg" class="image" />
  </div>
  <div class="cir3-arrow-yunbu">
    <img v-if="showImage" src="@/assets/yunbu/arrow5.svg" class="image" />
  </div>

    <div class="intro2">字数统计:</div>
    <div class="rect3-yunbu"></div>
    </div>

<div  class="yunbu1">
  <sjyunbu></sjyunbu>
</div>
      
<div class="line-chart"></div>

  </div>
</template>
        
    <script>
import navbar from "@/components/navbar.vue";
import navbar2 from "@/components/nav/navbar2.vue";
import sjyunbu from "@/components/yunbu/sjyunbu.vue";
import * as d3 from "d3";
import axios from "axios";

export default {
  data() {
    return {
      yb: [],
    yunjiao: [],
    showImage: true,
    };
  },
  components: {
    navbar,
    navbar2,
    sjyunbu,
  },
  methods: {
    ToLinkZY(){
      window.location.href = "/yunbu3/14"; 
    },
    ToLinkGY(){
      window.location.href = "/yunbu2/14"; 
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

            this.yb = yunbu2;
          this.yunjiao = yunjiao;

          const plotData = [];
          for (let i = 0; i < yunbu2.length; i++) {
            plotData.push({x: i, y: yunjiao[i].length})
          }
          console.log('plotdata:',plotData);
          resolve([plotData, yunbu2]); // 请求成功后resolve数据
          })
          .catch(function (err) {
            reject(err); // 请求失败后reject错误
          });
      });
    },

           //绘制折线图
  async drawPlot(){
    try {
  const data = await this.getShijing(); // 等待promise的结果
  //console.log('data: ',data);

  const plotdata = data[0];
  const yunbu = data[1];

  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select('.line-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    var x = d3.scaleLinear().domain([0, d3.max(plotdata, d => d.x)]).range([0, width]);
    var y = d3.scaleLinear().domain([0, d3.max(plotdata, d => d.y)]).range([height, 0]);

    const line = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    svg
      .append('path')
      .datum(plotdata)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', 'black');

    //坐标轴
    const xLabels = yunbu;
    x = d3.scalePoint().domain(xLabels).range([0, width]);
    y = d3.scaleLinear().domain([0, d3.max(plotdata, d => d.y)]).range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

// 创建x轴并设置颜色
svg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
  .selectAll('text') // 选择x轴上的文本元素
  .attr('fill', 'black') // 设置文本颜色为黑色
  .style("font-size", "12px");

// 创建y轴并设置颜色
svg.append('g')
  .attr('class', 'y-axis')
  .call(yAxis)
  .selectAll('text') // 选择y轴上的文本元素
  .attr('fill', 'black') // 设置文本颜色为黑色;
  .style("font-size", "12px");

// 设置坐标轴线的颜色为红色
svg.selectAll('.x-axis path, .x-axis line')
  .attr('stroke', 'black')
  .attr('stroke-width', 1);

svg.selectAll('.y-axis path, .y-axis line')
  .attr('stroke', 'black')
  .attr('stroke-width', 1);

    // 添加悬浮框
    const tooltip = d3
      .select('.line-chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

      svg
      .selectAll('.dot')
      .data(plotdata)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(xLabels[d.x]))
      .attr('cy', d => y(d.y))
      .attr('r', 3)
      .on('mouseover', function(event, d) {
        const [xCoord, yCoord] = d3.pointer(event);
        const dot = d3.select(this); // 当前数据点的引用
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`韵部: ${xLabels[d.x]}<br>字数: ${d.y}`) //悬浮框的内容
          .style('left', xCoord + 'px')
          .style('top', yCoord + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });


} catch (error) {
  console.error('Error:', error);
}
  }
  },
  created() {
  this.getShijing();
  this.drawPlot();
},
mounted() {
    setTimeout(() => {
      this.showImage = false;
    }, 5000); // 5000毫秒 = 5秒
  }
};
</script>
        
    <style>
* {
  /* 内外边距为0 */
  margin: 0;
  padding: 0;
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
.intro {
  position: fixed;
  top: 100px;
  left: 50px;
}
.intro1 {
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect1-yunbu {
  position: fixed;
  top: 140px;
  left: 50px;
  height: 13vh;
  width: 380px;
  background-color: #dedede;
  border-radius: 10px;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: left; /* 水平居中文本 */
  padding-left: 10px;
  padding-right: 10px;
}
.rect1-yunbu p {
  text-align: left;
}
.pic {
  position: fixed;
  top: calc(13vh + 180px);
  left: 50px;
  width: 380px; 
  z-index: 899;
}
.shijing {
    display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
    align-items: center; /* 垂直居中文本 */
    justify-content: center; /* 水平居中文本 */
    position: fixed;
    z-index: 99;
    top: calc(13vh + 180px);
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
.shijing a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.rect2-yunbu {
  position: fixed;
  top: calc(13vh + 380px);
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
  top: calc(13vh + 410px);
  left: 35px;
}
.txt a{
    color: #000;
    font-size: 20px;
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
  top: calc(13vh + 375px);
  left: 36.5px;
  width: 22px;
  height: 22px;
  background-color: #c6910e;
  border-radius: 50%;
}
.circle1 {
  position: fixed;
  z-index: 100;
  top: calc(13vh + 368px);
  left: 30px;
  width: 35px;
  height: 35px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 2px solid #c6910e;
}
.circle22{
  position: fixed;
  z-index: 100;
  top: calc(13vh + 370px);
  left: 210px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #e09d0a;
  cursor: pointer;
}
.circle32 {
  position: fixed;
  z-index: 100;
  top: calc(13vh + 370px);
  left: 370px;
  width: 25px;
  height: 25px;
  background-color: #f9f5f2;
  border-radius: 50%;
  border: 4px solid #c1a530;
  cursor: pointer;
}
.cir3-arrow-yunbu {
  position: fixed;
  z-index: 100;
  top: calc(13vh + 300px);
  left: 360px;
  width: 40px;
}
.cir2-arrow-yunbu {
  position: fixed;
  z-index: 100;
  top: calc(13vh + 300px);
  left: 200px;
  width: 40px;
}
.intro2 {
  position: fixed;
  top: calc(13vh + 450px);
  left: 50px;
  font-size: 20px;
  color: rgb(109, 110, 110);
}
.rect3-yunbu {
  position: fixed;
  top: calc(13vh + 490px);
  left: 50px;
  height: 25vh;
  width: 380px;
  background-color: #dedede;
  border-radius: 20px;
}
.yunbu1{
  display: flex;
  position: fixed;
  z-index: 9;
  top: 50px;
  left: 470px;
  width: calc(100% - 470px); /* 设置容器宽度为屏幕宽度减去200px */
  height: 90vh;
  /* background-color: aqua; */
  overflow: scroll;
}
.line-chart {
position: fixed;
top: calc(13vh + 490px);
left: 50px;
z-index: 999;
height: 25vh;
width: 380px;
overflow-x: scroll;
overflow-y: hidden;
}
.tooltip {
position: absolute;
padding: 5px;
pointer-events: none;
width: 100px;
  height: 70px;
  display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
/* 添加背景色和边框样式 */
background-color: #f9f9f9;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
.yunbuBG {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0px;
  left: 0px;
}
</style>