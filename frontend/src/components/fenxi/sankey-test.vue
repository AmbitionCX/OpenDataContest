<template>
    <div class="sankey-chart"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import * as d3Sankey from "d3-sankey";
  
  
  export default {
    name: 'SankeyChart',
    data(){
      return{
        textData: "这是我用来测试的一段话，如果你看到他正确显示在应有的位置上那就说明我的代码非常正确，否则我就要继续修改",
        pathData: '',
      }
    },
    mounted() {
      this.drawSankeyChart();
    },
    methods: {
      drawSankeyChart() {
        // 数据
        const data = {
          nodes: [
            { name: 'Node 1' },
            { name: 'Node 2' },
            { name: 'Node 3' },
            { name: 'Node 4' },
            { name: 'Node 5' },
            { name: 'Node 6' },
          ],
          links: [
            { source: 0, target: 1, value: 20 },
            { source: 0, target: 2, value: 10 },
            { source: 1, target: 3, value: 15 },
            { source: 1, target: 5, value: 10 },
            { source: 2, target: 3, value: 5 },
            { source: 2, target: 4, value: 15 }
          ]
        };
  
        // SVG容器
        const svg = d3.select('.sankey-chart')
          .append('svg')
          .attr('width', 800)
          .attr('height', 800);
  
        // 创建桑基图布局
        const sankey = d3Sankey
        .sankey()
          .nodeWidth(40)
          .nodePadding(10)
          .size([700, 700]);
  
        const { nodes, links } = sankey(data);
  
        // 创建颜色渐变
        const gradient = svg.append('defs')
          .append('linearGradient')
          .attr('id', 'gradient')
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '0%');
  
          gradient.append('stop')
          .attr('offset', '50%')
          .attr('stop-color', 'rgba(188, 204, 92, 1)');
        
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', 'rgba(222, 222, 222, 1)');
  
        // 绘制链接
        const link = svg.append('g')
          .selectAll('.link')
          .data(links)
          .enter()
          .append('path')
          .attr('class', 'link')
          .attr('d', d3Sankey.sankeyLinkHorizontal())
          .attr("id", function (d, i) { 
                      return 'path' + i;
                  })
          .attr('stroke', '#000')
          .attr('stroke-width', d => Math.max(1, d.width));
          
          var PathData = '';
  
          //添加鼠标悬浮事件
          link
          .on('mouseover', function(d,i) {
            PathData = this.getAttribute('d');
            console.log(PathData);
            drawTxt(PathData);
  
            d3.select(this).attr('stroke', 'url(#gradient)');
            //d3.select(this).select('.link-text').style('visibility', 'visible');
          })
          .on('mouseout', function() {
            d3.select(this).attr('stroke', "#000"); // 鼠标离开时恢复链接颜色为黑色
            svg.selectAll("textPath").remove();
          });;
  
          /////////////////////////////////////////////////////////
          const textData = "这是我用来测试的一段话，如果你看到他正确显示在应有的位置上那就说明我的代码非常正确，否则我就要继续修改";
  
          function drawTxt(pathData){
            svg.selectAll("textPath").remove();
            d3.select('#my-path-id').remove();
            console.log('actual: ',pathData);
  
            //const pathData ='M370,425.5555555555555C515,425.5555555555555,515,264.44444444444446,660,264.44444444444446'
  
        const path = svg.append("path")
          .attr("d", pathData)
          .attr("stroke", "none")
          .attr("stroke-width", 1)
          .attr("fill", "none")
          .attr("id", "my-path-id"); // Add a unique ID to the path element
  
        const text = svg.append("text")
          .attr("text-anchor", "middle") // Center-align text
          .attr("alignment-baseline", "middle") // Vertically center-align text
          .style("white-space", "pre-line"); // Enable line breaks
  
        const pathElement = path.node();
        const pathLength = pathElement.getTotalLength();
  
        // Split text into lines
        function splitTextIntoChunks(text, chunkSize) {
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
          chunks.push(text.substr(i, chunkSize));
        }
        return chunks;
      }
  
        const chunkSize = Math.floor(pathLength/15)
        const lines = splitTextIntoChunks(textData, chunkSize);
        
        // Append each line as a tspan element
        lines.forEach((line, index) => {
          text.append("textPath")
            .attr("href", "#my-path-id") // Reference the path by its ID
            .attr("startOffset", "50%") // Start text at the middle of the path
            .append("tspan")
            .attr("dy", `${index * 30 - 20}px`) // Adjust vertical positioning
            .text(line);
          });    
      }
  
      /////////////////////////////////////////////////////////////
                
        // 绘制节点
        const node = svg.append('g')
          .selectAll('.node')
          .data(nodes)
          .enter()
          .append('rect')
          .attr('class', 'node')
          .attr('x', d => d.x0)
          .attr('y', d => d.y0)
          .attr('height', d => d.y1 - d.y0)
          .attr('width', d => d.x1 - d.x0)
          .attr('fill', '#66c2a5');
  
        // 添加节点标签
        node.append('title')
          .text(d => d.name);
      },
  
      
    }
  };
  </script>
  
  <style>
  .node {
    cursor: move;
    fill-opacity: .9;
  }
  .link {
    fill: none;
    stroke-opacity: .2;
  }
  </style>
  