<template>
    <div class="sankey-chart">
      <svg :width="width" :height="height" ref="svgContainer"></svg>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  import * as d3Sankey from "d3-sankey";
  
  function mapNodes(links, nodes) {
    const nodeMap = new Map(nodes.map((d, i) => [d.name, i]));
    return links.map((link) => ({
      source: nodeMap.get(link.source),
      target: nodeMap.get(link.target),
      value: link.value,
    }));
  }
  
  export default {
    name: "SankeyChart",
    data() {
      return {
        width: 500,
        height: 300,
        sankeyData: {
          nodes: [
            { name: "A" },
            { name: "B" },
            { name: "C" },
            { name: "X" },
            { name: "Y" },
          ],
          links: [
            { source: "A", target: "X", value: 20 },
            { source: "A", target: "Y", value: 10 },
            { source: "B", target: "X", value: 5 },
            { source: "B", target: "Y", value: 15 },
            { source: "C", target: "X", value: 10 },
            { source: "C", target: "Y", value: 20 },
          ],
        },
      };
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const { nodes, links } = this.sankeyData;
  
        // Convert links' source and target from names to corresponding node objects
        const convertedLinks = mapNodes(links, nodes);
  
        const svg = d3.select(this.$refs.svgContainer);
  
        const sankey = d3Sankey
          .sankey()
          .nodeWidth(20)
          .nodePadding(10)
          .extent([
            [0, 5],
            [this.width, this.height - 5],
          ]);
  
        const { nodes: sankeyNodes, links: sankeyLinks } = sankey({
          nodes,
          links: convertedLinks,
        });
  
        svg
          .selectAll(".link")
          .data(sankeyLinks)
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("d", d3Sankey.sankeyLinkHorizontal())
          .style("stroke-width", (d) => Math.max(1, d.width))
          .style("stroke", "gray") // 设置连线颜色为灰色
          .style("fill", "none");
  
        svg
          .selectAll(".node")
          .data(sankeyNodes)
          .enter()
          .append("rect")
          .attr("class", "node")
          .attr("x", (d) => d.x0)
          .attr("y", (d) => d.y0)
          .attr("width", (d) => d.x1 - d.x0)
          .attr("height", (d) => d.y1 - d.y0)
          .style("fill", "lightblue") // 设置节点颜色为浅蓝色
          .style("stroke", "gray") // 设置节点边框颜色为灰色
          .style("stroke-width", 1); // 设置节点边框宽度
      },
    },
  };
  </script>
  
  <style>
  .sankey-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  