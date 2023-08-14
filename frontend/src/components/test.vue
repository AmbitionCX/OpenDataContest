<template>
  <div class="sankey-chart"></div>
</template>

<script>
import * as d3 from 'd3';
import * as d3Sankey from "d3-sankey";


export default {
  name: 'SankeyChart',
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
          { name: 'Node 3' }
        ],
        links: [
          { source: 0, target: 1, value: 20 },
          { source: 1, target: 2, value: 15 }
        ]
      };

      // SVG容器
      const svg = d3.select('.sankey-chart')
        .append('svg')
        .attr('width', 400)
        .attr('height', 300);

      // 创建桑基图布局
      const sankey = d3Sankey
      .sankey()
        .nodeWidth(40)
        .nodePadding(10)
        .size([300, 200]);

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
        .attr('stroke', '#000')
        .attr('stroke-width', d => Math.max(1, d.width))
        .on('mouseover', function() {
          d3.select(this).attr('stroke', 'url(#gradient)');
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke', "#000"); // 鼠标离开时恢复链接颜色为黑色
        });;

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
    }
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
