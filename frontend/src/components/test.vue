<template>
  <div>
    <svg ref="pieChart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    this.drawPieChart();
  },
  methods: {
    drawPieChart() {
      const data = [
        { label: '30', value: 30 },
        { label: '70', value: 70 },
      ];

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select(this.$refs.pieChart)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(d3.schemeCategory10);

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
        .attr('dy', '0.35em')
        .text(d => `${d.data.label}%`);
    },
  },
};
</script>

<style>
/* 可以添加一些样式来调整图表的外观 */
</style>
