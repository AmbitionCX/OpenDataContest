<template>
    <div ref="wordCloud" class="word-cloud"></div>
  </template>
  
  <style scoped>
  .word-cloud {
    background-color: #f2f2f2;
  }
  </style>
  
  <script>
  import * as d3 from 'd3';
  import * as cloud from 'd3-cloud';
  
  export default {
    mounted() {
      this.createWordCloud();
    },
    methods: {
      createWordCloud() {
        const width = 500;
        const height = 500;
  
        // 假设你有一个包含词频的数据，类似于 [{ text: 'word1', size: 10 }, { text: 'word2', size: 20 }, ...]
        const words = [
          { text: 'word1', size: 10 },
          { text: 'word2', size: 20 },
          { text: 'word3', size: 10 },
          { text: 'word4', size: 20 },
          // 其他词频数据
        ];
  
        const layout = cloud()
          .size([width, height])
          .words(words)
          .padding(5)
          .rotate(0) // 禁止旋转角度
          .font('impact')
          .fontSize((d) => d.size)
          .on('end', this.drawWordCloud);
  
        layout.start();
      },
      drawWordCloud(words) {
        const svg = d3.select(this.$refs.wordCloud)
          .append('svg')
          .attr('width', 500)
          .attr('height', 500);
  
        // 添加背景矩形
        svg.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 500)
          .attr('height', 500)
          .style('fill', '#f2f2f2');
  
        svg.append('g')
          .attr('transform', 'translate(250, 250)') // 将词云图居中显示
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', (d) => `${d.size}px`)
          .style('font-family', 'impact')
          .style('fill', '#000')
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
          .text((d) => d.text);
      },
    },
  };
  </script>
  