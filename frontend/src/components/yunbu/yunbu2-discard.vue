<template>
    <div class="bg" style="background-color: #f9f5f2">
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

        <div class="shijing"><a>广韵</a></div>
  
        <div class="rect2"></div>
        <div class="txt">
          <a class="txt1" href="/yunbu">诗经</a>
          <a class="txt3" href="/yunbu3">中原音韵</a>
        </div>
        <div class="circle12" @click="ToLinkSY"></div>
        <div class="circle2"><div class="circle21"></div></div>
        <div class="circle32" @click="ToLinkZY"></div>
  
      <div class="intro2">文字简介:</div>
      <div class="rect3"></div>
      </div>
  
  <div class="yunbu1">
    <gyyunbu></gyyunbu>
  </div>
        
  <div class="line-chart"></div>
  
    </div>
  </template>
          
      <script>
  import navbar from "@/components/navbar.vue";
  import navbar2 from "@/components/nav/navbar2.vue";
  import gyyunbu from "@/components/yunbu/gyyunbu.vue";
  import * as d3 from "d3";
  import axios from "axios";
  
  export default {
    data() {
      return {
        yb: [],
      yunjiao: [],
      };
    },
    components: {
      navbar,
      navbar2,
      gyyunbu,
    },
    methods: {
      ToLinkZY(){
      window.location.href = "/yunbu3"; 
    },
    ToLinkSJ(){
      window.location.href = "/yunbu"; 
    },

      async getShijing() {
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
      const width = 600 - margin.left - margin.right;
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

      svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${height})`).call(xAxis);
      svg.append('g').attr('class', 'y-axis').call(yAxis);

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
            .style('left', xCoord -30 + 'px')
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
  .shijing {
    display: flex; /* 使用 Flex 布局，可以根据需要进行调整 */
  align-items: center; /* 垂直居中文本 */
  justify-content: center; /* 水平居中文本 */
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
.shijing a {
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
  .txt a{
      color: #000;
      font-size: 20px;
  }
  .txt1{
      position: fixed;
      left: 35px;
  }
  .txt3{
      position: fixed;
      left: 350px;
  }
  .circle12{
    position: fixed;
    z-index: 100;
    top: 460px;
    left: 40px;
    width: 25px;
    height: 25px;
    background-color: #f9f5f2;
    border-radius: 50%;
    border: 4px solid #c6910e;
    cursor: pointer;
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
  .circle32{
    position: fixed;
    z-index: 100;
    top: 460px;
    left: 370px;
    width: 25px;
    height: 25px;
    background-color: #f9f5f2;
    border-radius: 50%;
    border: 4px solid #c1a530;
    cursor: pointer;
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
  .yunbu1{
  display: flex;
  position: fixed;
  /* z-index: 999; */
  top: 50px;
  left: 470px;
  width: calc(100% - 470px); /* 设置容器宽度为屏幕宽度减去200px */
  height: 90vh;
  /* background-color: aqua; */
  overflow: scroll;
}
  .line-chart {
  position: fixed;
  top: 600px;
  left: 50px;
  z-index: 999;
  height: 200px;
  width: 380px;
  overflow: scroll;
}
.tooltip {
  position: absolute;
  padding: 5px;
  pointer-events: none;
  
  /* 添加背景色和边框样式 */
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
  </style>