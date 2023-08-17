<template>
  <div class="line-chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // 在这里使用D3.js绘制折线图
      const data = [
        { x: 0, y: 5 },
        { x: 1, y: 9 },
        { x: 2, y: 7 },
        // 更多数据点...
      ];

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select('.line-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, width]);
      const y = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height, 0]);

      const line = d3
        .line()
        .x(d => x(d.x))
        .y(d => y(d.y));

      svg
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'black');
    },
  },
};
</script>

<style>
/* 样式可以根据您的需要进行调整 */
.line-chart {
  /* 添加样式 */
}
</style>
