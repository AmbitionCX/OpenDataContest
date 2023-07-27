<template>
  <div>
    <svg ref="svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import cloud from "d3-cloud";

export default {
  mounted() {
    this.drawWordCloud();
  },
  methods: {
    drawWordCloud() {
      const words = [
        { text: "蒹葭", txtwidth: 20 },
        { text: "白月光", txtwidth: 30 },
        { text: "中原音韵", txtwidth: 40 },
        // 添加更多单词和对应的大小
      ];

      const svg = d3.select(this.$refs.svg)
        .attr("width", 500)
        .attr("height", 500);

      const layout = cloud()
        .size([500, 500])
        .words(words)
        .padding(5)
        .rotate(() => 0) // 设置旋转角度为0，即不旋转
        .font("Impact")
        .fontSize(20)
        .on("end", this.draw);

      layout.start();
    },
    draw(words) {
      const svg = d3.select(this.$refs.svg);

      svg.selectAll("g").remove();

      const g = svg.append("g")
        .attr("transform", "translate(250,250)");

      g.selectAll("rect")
        .data(words)
        .enter()
        .append("rect")
          .attr("x", d => d.x - d.txtwidth - 5)
          .attr("y", d => d.y - 15)
          .attr("width", d => d.txtwidth*2 + 10)
          .attr("height", d => 30)
          .style("fill", "red")
          .attr('rx',8)
          .attr('ry',8)
          .style("opacity", 0.3);

      g.selectAll("text")
        .data(words)
        .enter()
        .append("text")
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .style("font-size", d => 20 + "px")
          .style("font-family", "Impact")
          .style("fill", "white")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .text(d => d.text);
    }
  }
};
</script>

<style scoped>
svg {
  background-color: lightgray;
}
</style>